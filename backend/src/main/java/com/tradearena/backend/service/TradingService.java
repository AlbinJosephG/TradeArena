package com.tradearena.backend.service;

import com.tradearena.backend.dto.BuyStockRequest;
import com.tradearena.backend.dto.PortfolioResponse;
import com.tradearena.backend.dto.SellStockRequest;
import com.tradearena.backend.dto.TransactionResponse;
import com.tradearena.backend.entity.*;
import com.tradearena.backend.repository.*;
import org.springframework.stereotype.Service;
import com.tradearena.backend.dto.LeaderboardResponse;
import java.util.Comparator;
import com.tradearena.backend.dto.UserDashboardResponse;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TradingService {

    private final UserRepository userRepository;
    private final SeasonRepository seasonRepository;
    private final StockRepository stockRepository;
    private final WalletRepository walletRepository;
    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;

    public TradingService(UserRepository userRepository,
                          SeasonRepository seasonRepository,
                          StockRepository stockRepository,
                          WalletRepository walletRepository,
                          PortfolioRepository portfolioRepository,
                          TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.seasonRepository = seasonRepository;
        this.stockRepository = stockRepository;
        this.walletRepository = walletRepository;
        this.portfolioRepository = portfolioRepository;
        this.transactionRepository = transactionRepository;
    }

    public String buyStock(BuyStockRequest request) {

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            return "Quantity must be greater than 0";
        }

        User user = userRepository.findById(request.getUserId()).orElse(null);
        Season season = seasonRepository.findById(request.getSeasonId()).orElse(null);
        Stock stock = stockRepository.findById(request.getStockId()).orElse(null);

        if (user == null) return "User not found";
        if (season == null) return "Season not found";
        if (stock == null) return "Stock not found";

        if (!"ACTIVE".equalsIgnoreCase(season.getStatus())) {
            return "Season is not active";
        }

        Wallet wallet = walletRepository.findByUserAndSeason(user, season).orElse(null);

        if (wallet == null) {
            return "Wallet not found. Join season first.";
        }

        Double totalCost = stock.getCurrentPrice() * request.getQuantity();

        if (wallet.getCashBalance() < totalCost) {
            return "Insufficient wallet balance";
        }

        wallet.setCashBalance(wallet.getCashBalance() - totalCost);
        wallet.setTotalInvested(wallet.getTotalInvested() + totalCost);
        walletRepository.save(wallet);

        Portfolio portfolio = portfolioRepository
                .findByUserAndSeasonAndStock(user, season, stock)
                .orElse(null);

        if (portfolio == null) {
            portfolio = new Portfolio();
            portfolio.setUser(user);
            portfolio.setSeason(season);
            portfolio.setStock(stock);
            portfolio.setQuantity(request.getQuantity());
            portfolio.setAverageBuyPrice(stock.getCurrentPrice());
        } else {
            int oldQuantity = portfolio.getQuantity();
            double oldAverage = portfolio.getAverageBuyPrice();
            int newQuantity = oldQuantity + request.getQuantity();

            double newAverage = ((oldQuantity * oldAverage) + totalCost) / newQuantity;

            portfolio.setQuantity(newQuantity);
            portfolio.setAverageBuyPrice(newAverage);
        }

        portfolioRepository.save(portfolio);

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setSeason(season);
        transaction.setStock(stock);
        transaction.setTransactionType("BUY");
        transaction.setQuantity(request.getQuantity());
        transaction.setPricePerStock(stock.getCurrentPrice());
        transaction.setTotalAmount(totalCost);
        transaction.setCreatedAt(LocalDateTime.now());

        transactionRepository.save(transaction);

        return "Stock bought successfully";
    }

    public String sellStock(SellStockRequest request) {

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            return "Quantity must be greater than 0";
        }

        User user = userRepository.findById(request.getUserId()).orElse(null);
        Season season = seasonRepository.findById(request.getSeasonId()).orElse(null);
        Stock stock = stockRepository.findById(request.getStockId()).orElse(null);

        if (user == null) return "User not found";
        if (season == null) return "Season not found";
        if (stock == null) return "Stock not found";

        if (!"ACTIVE".equalsIgnoreCase(season.getStatus())) {
            return "Season is not active";
        }

        Wallet wallet = walletRepository.findByUserAndSeason(user, season).orElse(null);

        if (wallet == null) {
            return "Wallet not found. Join season first.";
        }

        Portfolio portfolio = portfolioRepository
                .findByUserAndSeasonAndStock(user, season, stock)
                .orElse(null);

        if (portfolio == null) {
            return "Stock not found in portfolio";
        }

        if (portfolio.getQuantity() < request.getQuantity()) {
            return "Cannot sell more than owned quantity";
        }

        Double totalSellAmount = stock.getCurrentPrice() * request.getQuantity();

        portfolio.setQuantity(portfolio.getQuantity() - request.getQuantity());

        if (portfolio.getQuantity() == 0) {
            portfolioRepository.delete(portfolio);
        } else {
            portfolioRepository.save(portfolio);
        }

        wallet.setCashBalance(wallet.getCashBalance() + totalSellAmount);

        Double newTotalInvested = wallet.getTotalInvested() - totalSellAmount;
        if (newTotalInvested < 0) {
            newTotalInvested = 0.0;
        }

        wallet.setTotalInvested(newTotalInvested);
        walletRepository.save(wallet);

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setSeason(season);
        transaction.setStock(stock);
        transaction.setTransactionType("SELL");
        transaction.setQuantity(request.getQuantity());
        transaction.setPricePerStock(stock.getCurrentPrice());
        transaction.setTotalAmount(totalSellAmount);
        transaction.setCreatedAt(LocalDateTime.now());

        transactionRepository.save(transaction);

        return "Stock sold successfully";
    }

    public List<Portfolio> getPortfolio(Long userId, Long seasonId) {
        User user = userRepository.findById(userId).orElse(null);
        Season season = seasonRepository.findById(seasonId).orElse(null);

        if (user == null || season == null) {
            return List.of();
        }

        return portfolioRepository.findByUserAndSeason(user, season);
    }

    public List<Transaction> getTransactions(Long userId, Long seasonId) {
        User user = userRepository.findById(userId).orElse(null);
        Season season = seasonRepository.findById(seasonId).orElse(null);

        if (user == null || season == null) {
            return List.of();
        }

        return transactionRepository.findByUserAndSeasonOrderByCreatedAtDesc(user, season);
    }

    public List<PortfolioResponse> getPortfolioDetails(Long userId, Long seasonId) {
        User user = userRepository.findById(userId).orElse(null);
        Season season = seasonRepository.findById(seasonId).orElse(null);

        if (user == null || season == null) {
            return List.of();
        }

        List<Portfolio> portfolios = portfolioRepository.findByUserAndSeason(user, season);
        List<PortfolioResponse> responses = new ArrayList<>();

        for (Portfolio portfolio : portfolios) {
            Stock stock = portfolio.getStock();

            Double investedAmount = portfolio.getQuantity() * portfolio.getAverageBuyPrice();
            Double currentValue = portfolio.getQuantity() * stock.getCurrentPrice();
            Double profitLoss = currentValue - investedAmount;

            Double profitLossPercentage = 0.0;
            if (investedAmount > 0) {
                profitLossPercentage = (profitLoss / investedAmount) * 100;
            }

            PortfolioResponse response = new PortfolioResponse(
                    stock.getCompanyName(),
                    stock.getSymbol(),
                    portfolio.getQuantity(),
                    portfolio.getAverageBuyPrice(),
                    stock.getCurrentPrice(),
                    investedAmount,
                    currentValue,
                    profitLoss,
                    profitLossPercentage
            );

            responses.add(response);
        }

        return responses;
    }

    public List<TransactionResponse> getTransactionDetails(Long userId, Long seasonId) {
        User user = userRepository.findById(userId).orElse(null);
        Season season = seasonRepository.findById(seasonId).orElse(null);

        if (user == null || season == null) {
            return List.of();
        }

        List<Transaction> transactions =
                transactionRepository.findByUserAndSeasonOrderByCreatedAtDesc(user, season);

        List<TransactionResponse> responses = new ArrayList<>();

        for (Transaction transaction : transactions) {
            Stock stock = transaction.getStock();

            TransactionResponse response = new TransactionResponse(
                    transaction.getTransactionType(),
                    stock.getCompanyName(),
                    stock.getSymbol(),
                    transaction.getQuantity(),
                    transaction.getPricePerStock(),
                    transaction.getTotalAmount(),
                    transaction.getCreatedAt()
            );

            responses.add(response);
        }

        return responses;
    }
    public List<LeaderboardResponse> getLeaderboard(Long seasonId) {
    Season season = seasonRepository.findById(seasonId).orElse(null);

    if (season == null) {
        return List.of();
    }

    List<Wallet> wallets = walletRepository.findBySeason(season);
    List<LeaderboardResponse> leaderboard = new ArrayList<>();

    for (Wallet wallet : wallets) {
        User user = wallet.getUser();

        List<Portfolio> portfolios = portfolioRepository.findByUserAndSeason(user, season);

        Double portfolioValue = 0.0;

        for (Portfolio portfolio : portfolios) {
            Stock stock = portfolio.getStock();
            portfolioValue += portfolio.getQuantity() * stock.getCurrentPrice();
        }

        Double cashBalance = wallet.getCashBalance();
        Double totalValue = cashBalance + portfolioValue;
        Double profitLoss = totalValue - season.getStartingBalance();

        LeaderboardResponse response = new LeaderboardResponse(
        0,
        user.getName(),
        round2(cashBalance),
        round2(portfolioValue),
        round2(totalValue),
        round2(profitLoss)
);

        leaderboard.add(response);
    }

    leaderboard.sort(Comparator.comparing(LeaderboardResponse::getTotalValue).reversed());

    int rank = 1;
    for (LeaderboardResponse response : leaderboard) {
        response.setRank(rank);
        rank++;
    }

    return leaderboard;
}
public UserDashboardResponse getUserDashboard(Long userId, Long seasonId) {
    User user = userRepository.findById(userId).orElse(null);
    Season season = seasonRepository.findById(seasonId).orElse(null);

    if (user == null || season == null) {
        return null;
    }

    Wallet wallet = walletRepository.findByUserAndSeason(user, season).orElse(null);

    if (wallet == null) {
        return null;
    }

    List<Portfolio> portfolios = portfolioRepository.findByUserAndSeason(user, season);

    Double portfolioValue = 0.0;

    for (Portfolio portfolio : portfolios) {
        Stock stock = portfolio.getStock();
        portfolioValue += portfolio.getQuantity() * stock.getCurrentPrice();
    }

    Double cashBalance = wallet.getCashBalance();
    Double totalValue = cashBalance + portfolioValue;
    Double profitLoss = totalValue - season.getStartingBalance();

    Integer stocksOwned = portfolios.size();

    List<Transaction> transactions =
            transactionRepository.findByUserAndSeasonOrderByCreatedAtDesc(user, season);

    Integer totalTrades = transactions.size();

    List<TransactionResponse> recentTransactions = new ArrayList<>();

    int limit = Math.min(5, transactions.size());

    for (int i = 0; i < limit; i++) {
        Transaction transaction = transactions.get(i);
        Stock stock = transaction.getStock();

        TransactionResponse response = new TransactionResponse(
                transaction.getTransactionType(),
                stock.getCompanyName(),
                stock.getSymbol(),
                transaction.getQuantity(),
                transaction.getPricePerStock(),
                transaction.getTotalAmount(),
                transaction.getCreatedAt()
        );

        recentTransactions.add(response);
    }

    List<LeaderboardResponse> leaderboard = getLeaderboard(seasonId);

    Integer rank = 0;

    for (LeaderboardResponse item : leaderboard) {
        if (item.getUserName().equals(user.getName())) {
            rank = item.getRank();
            break;
        }
    }

    return new UserDashboardResponse(
            cashBalance,
            portfolioValue,
            totalValue,
            profitLoss,
            rank,
            stocksOwned,
            totalTrades,
            recentTransactions
    );
}
private Double round2(Double value) {
    return Math.round(value * 100.0) / 100.0;
}
}
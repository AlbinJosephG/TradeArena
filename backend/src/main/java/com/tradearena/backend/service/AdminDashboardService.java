package com.tradearena.backend.service;

import com.tradearena.backend.dto.AdminDashboardResponse;
import com.tradearena.backend.dto.LeaderboardResponse;
import com.tradearena.backend.entity.Season;
import com.tradearena.backend.entity.Transaction;
import com.tradearena.backend.repository.SeasonRepository;
import com.tradearena.backend.repository.StockRepository;
import com.tradearena.backend.repository.TransactionRepository;
import com.tradearena.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDashboardService {

    private final UserRepository userRepository;
    private final StockRepository stockRepository;
    private final TransactionRepository transactionRepository;
    private final SeasonRepository seasonRepository;
    private final TradingService tradingService;

    public AdminDashboardService(UserRepository userRepository,
                                 StockRepository stockRepository,
                                 TransactionRepository transactionRepository,
                                 SeasonRepository seasonRepository,
                                 TradingService tradingService) {
        this.userRepository = userRepository;
        this.stockRepository = stockRepository;
        this.transactionRepository = transactionRepository;
        this.seasonRepository = seasonRepository;
        this.tradingService = tradingService;
    }

    public AdminDashboardResponse getAdminDashboard() {

        Long totalUsers = userRepository.count();
        Long totalStocks = stockRepository.count();
        Long totalTrades = transactionRepository.count();

        Season activeSeason = seasonRepository
                .findFirstByStatusIgnoreCase("ACTIVE")
                .orElse(null);

        String activeSeasonName = activeSeason != null ? activeSeason.getName() : "No active season";

        Double marketVolume = 0.0;

        List<Transaction> transactions = transactionRepository.findAll();

        for (Transaction transaction : transactions) {
            marketVolume += transaction.getTotalAmount();
        }

        List<LeaderboardResponse> topUsers = List.of();

        if (activeSeason != null) {
            List<LeaderboardResponse> leaderboard =
                    tradingService.getLeaderboard(activeSeason.getId());

            int limit = Math.min(5, leaderboard.size());
            topUsers = leaderboard.subList(0, limit);
        }

        return new AdminDashboardResponse(
                totalUsers,
                totalStocks,
                totalTrades,
                activeSeasonName,
                marketVolume,
                topUsers
        );
    }
}

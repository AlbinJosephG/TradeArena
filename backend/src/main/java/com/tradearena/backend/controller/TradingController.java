package com.tradearena.backend.controller;

import com.tradearena.backend.dto.BuyStockRequest;
import com.tradearena.backend.entity.Portfolio;
import com.tradearena.backend.service.TradingService;
import org.springframework.web.bind.annotation.*;
import com.tradearena.backend.entity.Transaction;
import com.tradearena.backend.dto.SellStockRequest;
import com.tradearena.backend.dto.PortfolioResponse;
import java.util.List;
import com.tradearena.backend.dto.TransactionResponse;
import com.tradearena.backend.dto.LeaderboardResponse;
import com.tradearena.backend.dto.UserDashboardResponse;


@RestController
@RequestMapping("/api/trade")
@CrossOrigin(origins = "*")
public class TradingController {

    private final TradingService tradingService;

    public TradingController(TradingService tradingService) {
        this.tradingService = tradingService;
    }

    @PostMapping("/buy")
    public String buyStock(@RequestBody BuyStockRequest request) {
        return tradingService.buyStock(request);
    }
    @GetMapping("/portfolio/{userId}/{seasonId}")
public List<Portfolio> getPortfolio(@PathVariable Long userId,
                                     @PathVariable Long seasonId) {
    return tradingService.getPortfolio(userId, seasonId);
}

@GetMapping("/transactions/{userId}/{seasonId}")
public List<Transaction> getTransactions(@PathVariable Long userId,
                                         @PathVariable Long seasonId) {
    return tradingService.getTransactions(userId, seasonId);
}
@PostMapping("/sell")
public String sellStock(@RequestBody SellStockRequest request) {
    return tradingService.sellStock(request);
}
@GetMapping("/portfolio/details/{userId}/{seasonId}")
public List<PortfolioResponse> getPortfolioDetails(@PathVariable Long userId,
                                                   @PathVariable Long seasonId) {
    return tradingService.getPortfolioDetails(userId, seasonId);
}
@GetMapping("/transactions/details/{userId}/{seasonId}")
public List<TransactionResponse> getTransactionDetails(@PathVariable Long userId,
                                                       @PathVariable Long seasonId) {
    return tradingService.getTransactionDetails(userId, seasonId);
}
@GetMapping("/leaderboard/{seasonId}")
public List<LeaderboardResponse> getLeaderboard(@PathVariable Long seasonId) {
    return tradingService.getLeaderboard(seasonId);
}
@GetMapping("/dashboard/user/{userId}/{seasonId}")
public UserDashboardResponse getUserDashboard(@PathVariable Long userId,
                                               @PathVariable Long seasonId) {
    return tradingService.getUserDashboard(userId, seasonId);
}
}

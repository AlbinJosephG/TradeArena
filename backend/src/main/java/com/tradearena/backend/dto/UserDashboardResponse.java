package com.tradearena.backend.dto;

import java.util.List;

public class UserDashboardResponse {

    private Double cashBalance;
    private Double portfolioValue;
    private Double totalValue;
    private Double profitLoss;
    private Integer rank;
    private Integer stocksOwned;
    private Integer totalTrades;
    private List<TransactionResponse> recentTransactions;

    public UserDashboardResponse(Double cashBalance, Double portfolioValue,
                                 Double totalValue, Double profitLoss,
                                 Integer rank, Integer stocksOwned,
                                 Integer totalTrades,
                                 List<TransactionResponse> recentTransactions) {
        this.cashBalance = cashBalance;
        this.portfolioValue = portfolioValue;
        this.totalValue = totalValue;
        this.profitLoss = profitLoss;
        this.rank = rank;
        this.stocksOwned = stocksOwned;
        this.totalTrades = totalTrades;
        this.recentTransactions = recentTransactions;
    }

    public Double getCashBalance() { return cashBalance; }
    public Double getPortfolioValue() { return portfolioValue; }
    public Double getTotalValue() { return totalValue; }
    public Double getProfitLoss() { return profitLoss; }
    public Integer getRank() { return rank; }
    public Integer getStocksOwned() { return stocksOwned; }
    public Integer getTotalTrades() { return totalTrades; }
    public List<TransactionResponse> getRecentTransactions() { return recentTransactions; }
}

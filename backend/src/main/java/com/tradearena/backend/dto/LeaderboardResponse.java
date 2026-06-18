package com.tradearena.backend.dto;

public class LeaderboardResponse {

    private Integer rank;
    private String userName;
    private Double cashBalance;
    private Double portfolioValue;
    private Double totalValue;
    private Double profitLoss;

    public LeaderboardResponse(Integer rank, String userName,
                               Double cashBalance, Double portfolioValue,
                               Double totalValue, Double profitLoss) {
        this.rank = rank;
        this.userName = userName;
        this.cashBalance = cashBalance;
        this.portfolioValue = portfolioValue;
        this.totalValue = totalValue;
        this.profitLoss = profitLoss;
    }

    public Integer getRank() {
        return rank;
    }

    public String getUserName() {
        return userName;
    }

    public Double getCashBalance() {
        return cashBalance;
    }

    public Double getPortfolioValue() {
        return portfolioValue;
    }

    public Double getTotalValue() {
        return totalValue;
    }

    public Double getProfitLoss() {
        return profitLoss;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }
}

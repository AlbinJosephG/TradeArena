package com.tradearena.backend.dto;

public class PortfolioResponse {

    private String stockName;
    private String symbol;
    private Integer quantity;
    private Double averageBuyPrice;
    private Double currentPrice;
    private Double investedAmount;
    private Double currentValue;
    private Double profitLoss;
    private Double profitLossPercentage;

    public PortfolioResponse(String stockName, String symbol, Integer quantity,
                             Double averageBuyPrice, Double currentPrice,
                             Double investedAmount, Double currentValue,
                             Double profitLoss, Double profitLossPercentage) {
        this.stockName = stockName;
        this.symbol = symbol;
        this.quantity = quantity;
        this.averageBuyPrice = averageBuyPrice;
        this.currentPrice = currentPrice;
        this.investedAmount = investedAmount;
        this.currentValue = currentValue;
        this.profitLoss = profitLoss;
        this.profitLossPercentage = profitLossPercentage;
    }

    public String getStockName() { return stockName; }
    public String getSymbol() { return symbol; }
    public Integer getQuantity() { return quantity; }
    public Double getAverageBuyPrice() { return averageBuyPrice; }
    public Double getCurrentPrice() { return currentPrice; }
    public Double getInvestedAmount() { return investedAmount; }
    public Double getCurrentValue() { return currentValue; }
    public Double getProfitLoss() { return profitLoss; }
    public Double getProfitLossPercentage() { return profitLossPercentage; }
}

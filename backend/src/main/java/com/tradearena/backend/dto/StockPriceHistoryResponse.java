package com.tradearena.backend.dto;

import java.time.LocalDateTime;

public class StockPriceHistoryResponse {

    private String symbol;
    private Double oldPrice;
    private Double newPrice;
    private Double changePercent;
    private LocalDateTime createdAt;

    public StockPriceHistoryResponse(String symbol, Double oldPrice, Double newPrice,
                                     Double changePercent, LocalDateTime createdAt) {
        this.symbol = symbol;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
        this.changePercent = changePercent;
        this.createdAt = createdAt;
    }

    public String getSymbol() {
        return symbol;
    }

    public Double getOldPrice() {
        return oldPrice;
    }

    public Double getNewPrice() {
        return newPrice;
    }

    public Double getChangePercent() {
        return changePercent;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
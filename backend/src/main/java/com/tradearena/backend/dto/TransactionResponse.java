package com.tradearena.backend.dto;

import java.time.LocalDateTime;

public class TransactionResponse {

    private String transactionType;
    private String stockName;
    private String symbol;
    private Integer quantity;
    private Double pricePerStock;
    private Double totalAmount;
    private LocalDateTime createdAt;

    public TransactionResponse(String transactionType, String stockName, String symbol,
                               Integer quantity, Double pricePerStock,
                               Double totalAmount, LocalDateTime createdAt) {
        this.transactionType = transactionType;
        this.stockName = stockName;
        this.symbol = symbol;
        this.quantity = quantity;
        this.pricePerStock = pricePerStock;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public String getStockName() {
        return stockName;
    }

    public String getSymbol() {
        return symbol;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Double getPricePerStock() {
        return pricePerStock;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}

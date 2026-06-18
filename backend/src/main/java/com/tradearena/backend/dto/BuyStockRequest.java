
package com.tradearena.backend.dto;

public class BuyStockRequest {

    private Long userId;
    private Long seasonId;
    private Long stockId;
    private Integer quantity;

    public BuyStockRequest() {}

    public Long getUserId() {
        return userId;
    }

    public Long getSeasonId() {
        return seasonId;
    }

    public Long getStockId() {
        return stockId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setSeasonId(Long seasonId) {
        this.seasonId = seasonId;
    }

    public void setStockId(Long stockId) {
        this.stockId = stockId;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
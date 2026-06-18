package com.tradearena.backend.entity;

import jakarta.persistence.*;

@Entity
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;
    private Double averageBuyPrice;

    @ManyToOne
    private User user;

    @ManyToOne
    private Season season;

    @ManyToOne
    private Stock stock;

    public Portfolio() {}

    public Long getId() {
        return id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getAverageBuyPrice() {
        return averageBuyPrice;
    }

    public void setAverageBuyPrice(Double averageBuyPrice) {
        this.averageBuyPrice = averageBuyPrice;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }
}
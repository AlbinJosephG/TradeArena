package com.tradearena.backend.entity;

import jakarta.persistence.*;

@Entity
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double cashBalance;
    private Double totalInvested;

    @ManyToOne
    private User user;

    @ManyToOne
    private Season season;

    public Wallet() {}

    public Long getId() {
        return id;
    }

    public Double getCashBalance() {
        return cashBalance;
    }

    public void setCashBalance(Double cashBalance) {
        this.cashBalance = cashBalance;
    }

    public Double getTotalInvested() {
        return totalInvested;
    }

    public void setTotalInvested(Double totalInvested) {
        this.totalInvested = totalInvested;
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
}

package com.tradearena.backend.dto;

import java.util.List;

public class AdminDashboardResponse {

    private Long totalUsers;
    private Long totalStocks;
    private Long totalTrades;
    private String activeSeason;
    private Double marketVolume;
    private List<LeaderboardResponse> topUsers;

    public AdminDashboardResponse(Long totalUsers, Long totalStocks, Long totalTrades,
                                  String activeSeason, Double marketVolume,
                                  List<LeaderboardResponse> topUsers) {
        this.totalUsers = totalUsers;
        this.totalStocks = totalStocks;
        this.totalTrades = totalTrades;
        this.activeSeason = activeSeason;
        this.marketVolume = marketVolume;
        this.topUsers = topUsers;
    }

    public Long getTotalUsers() { return totalUsers; }
    public Long getTotalStocks() { return totalStocks; }
    public Long getTotalTrades() { return totalTrades; }
    public String getActiveSeason() { return activeSeason; }
    public Double getMarketVolume() { return marketVolume; }
    public List<LeaderboardResponse> getTopUsers() { return topUsers; }
}
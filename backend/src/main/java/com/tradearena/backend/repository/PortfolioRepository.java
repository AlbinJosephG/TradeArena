package com.tradearena.backend.repository;

import com.tradearena.backend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    Optional<Portfolio> findByUserAndSeasonAndStock(User user, Season season, Stock stock);

    List<Portfolio> findByUserAndSeason(User user, Season season);
}
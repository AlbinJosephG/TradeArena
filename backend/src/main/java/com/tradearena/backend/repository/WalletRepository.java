package com.tradearena.backend.repository;

import com.tradearena.backend.entity.Season;
import com.tradearena.backend.entity.User;
import com.tradearena.backend.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {


    Optional<Wallet> findByUserAndSeason(User user, Season season);
    List<Wallet> findBySeason(Season season);
}

package com.tradearena.backend.repository;

import com.tradearena.backend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserAndSeasonOrderByCreatedAtDesc(User user, Season season);
    
}
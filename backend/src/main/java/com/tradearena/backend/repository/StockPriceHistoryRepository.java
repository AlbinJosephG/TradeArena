package com.tradearena.backend.repository;

import com.tradearena.backend.entity.Stock;
import com.tradearena.backend.entity.StockPriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockPriceHistoryRepository extends JpaRepository<StockPriceHistory, Long> {

    List<StockPriceHistory> findByStockOrderByCreatedAtAsc(Stock stock);
}
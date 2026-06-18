package com.tradearena.backend.repository;

import com.tradearena.backend.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {

    List<Stock> findBySymbolContainingIgnoreCase(String symbol);

    List<Stock> findByCompanyNameContainingIgnoreCase(String companyName);

    List<Stock> findByCurrentPriceGreaterThanEqual(Double price);

    List<Stock> findByCurrentPriceLessThanEqual(Double price);

    List<Stock> findAllByOrderByCurrentPriceAsc();

    List<Stock> findAllByOrderByCurrentPriceDesc();
}
package com.tradearena.backend.service;

import com.tradearena.backend.dto.StockPriceHistoryResponse;
import com.tradearena.backend.entity.Stock;
import com.tradearena.backend.entity.StockPriceHistory;
import com.tradearena.backend.repository.StockPriceHistoryRepository;
import com.tradearena.backend.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class StockService {

    private final StockRepository stockRepository;
    private final StockPriceHistoryRepository stockPriceHistoryRepository;

    public StockService(StockRepository stockRepository,
                        StockPriceHistoryRepository stockPriceHistoryRepository) {
        this.stockRepository = stockRepository;
        this.stockPriceHistoryRepository = stockPriceHistoryRepository;
    }

    public Stock createStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock getStockById(Long id) {
        return stockRepository.findById(id).orElse(null);
    }

    public Stock updateStock(Long id, Stock updatedStock) {
        Stock stock = stockRepository.findById(id).orElse(null);

        if (stock == null) {
            return null;
        }

        Double oldPrice = stock.getCurrentPrice();

        stock.setSymbol(updatedStock.getSymbol());
        stock.setCompanyName(updatedStock.getCompanyName());
        stock.setCurrentPrice(updatedStock.getCurrentPrice());

        Stock savedStock = stockRepository.save(stock);

        savePriceHistory(savedStock, oldPrice, updatedStock.getCurrentPrice());

        return savedStock;
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }

    public Stock updateRandomPrice(Long id) {
        Stock stock = stockRepository.findById(id).orElse(null);

        if (stock == null) {
            return null;
        }

        Random random = new Random();

        double changePercent = -5 + (10 * random.nextDouble());

        double oldPrice = stock.getCurrentPrice();
        double newPrice = oldPrice + (oldPrice * changePercent / 100);

        newPrice = round2(newPrice);

        stock.setCurrentPrice(newPrice);

        Stock savedStock = stockRepository.save(stock);

        savePriceHistory(savedStock, oldPrice, newPrice);

        return savedStock;
    }

    public List<Stock> updateAllRandomPrices() {
        List<Stock> stocks = stockRepository.findAll();

        Random random = new Random();

        for (Stock stock : stocks) {
            double changePercent = -5 + (10 * random.nextDouble());

            double oldPrice = stock.getCurrentPrice();
            double newPrice = oldPrice + (oldPrice * changePercent / 100);

            newPrice = round2(newPrice);

            stock.setCurrentPrice(newPrice);
            stockRepository.save(stock);

            savePriceHistory(stock, oldPrice, newPrice);
        }

        return stocks;
    }

    public List<StockPriceHistoryResponse> getPriceHistory(Long stockId) {
        Stock stock = stockRepository.findById(stockId).orElse(null);

        if (stock == null) {
            return List.of();
        }

        List<StockPriceHistory> histories =
                stockPriceHistoryRepository.findByStockOrderByCreatedAtAsc(stock);

        List<StockPriceHistoryResponse> responses = new ArrayList<>();

        for (StockPriceHistory history : histories) {
            StockPriceHistoryResponse response = new StockPriceHistoryResponse(
                    stock.getSymbol(),
                    history.getOldPrice(),
                    history.getNewPrice(),
                    history.getChangePercent(),
                    history.getCreatedAt()
            );

            responses.add(response);
        }

        return responses;
    }

    private void savePriceHistory(Stock stock, Double oldPrice, Double newPrice) {
        if (oldPrice == null || newPrice == null || oldPrice.equals(newPrice)) {
            return;
        }

        Double changePercent = ((newPrice - oldPrice) / oldPrice) * 100;
        changePercent = round2(changePercent);

        StockPriceHistory history = new StockPriceHistory();
        history.setStock(stock);
        history.setOldPrice(round2(oldPrice));
        history.setNewPrice(round2(newPrice));
        history.setChangePercent(changePercent);
        history.setCreatedAt(LocalDateTime.now());

        stockPriceHistoryRepository.save(history);
    }

    private Double round2(Double value) {
        return Math.round(value * 100.0) / 100.0;
    }
    public List<Stock> searchBySymbol(String symbol) {
    return stockRepository.findBySymbolContainingIgnoreCase(symbol);
}

public List<Stock> searchByCompanyName(String companyName) {
    return stockRepository.findByCompanyNameContainingIgnoreCase(companyName);
}

public List<Stock> getStocksAbovePrice(Double price) {
    return stockRepository.findByCurrentPriceGreaterThanEqual(price);
}

public List<Stock> getStocksBelowPrice(Double price) {
    return stockRepository.findByCurrentPriceLessThanEqual(price);
}

public List<Stock> sortStocksByPriceAsc() {
    return stockRepository.findAllByOrderByCurrentPriceAsc();
}

public List<Stock> sortStocksByPriceDesc() {
    return stockRepository.findAllByOrderByCurrentPriceDesc();
}
}
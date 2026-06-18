package com.tradearena.backend.controller;

import com.tradearena.backend.dto.StockPriceHistoryResponse;
import com.tradearena.backend.entity.Stock;
import com.tradearena.backend.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "*")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @PostMapping
    public Stock createStock(@RequestBody Stock stock) {
        return stockService.createStock(stock);
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/{id}")
    public Stock getStockById(@PathVariable Long id) {
        return stockService.getStockById(id);
    }

    @PutMapping("/{id}")
    public Stock updateStock(@PathVariable Long id, @RequestBody Stock stock) {
        return stockService.updateStock(id, stock);
    }

    @DeleteMapping("/{id}")
    public String deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
        return "Stock deleted successfully";
    }

    @PutMapping("/{id}/random-price")
    public Stock updateRandomPrice(@PathVariable Long id) {
        return stockService.updateRandomPrice(id);
    }

    @PutMapping("/random-prices")
    public List<Stock> updateAllRandomPrices() {
        return stockService.updateAllRandomPrices();
    }

    @GetMapping("/{id}/price-history")
    public List<StockPriceHistoryResponse> getPriceHistory(@PathVariable Long id) {
        return stockService.getPriceHistory(id);
    }
    @GetMapping("/search/symbol")
public List<Stock> searchBySymbol(@RequestParam String symbol) {
    return stockService.searchBySymbol(symbol);
}

@GetMapping("/search/company")
public List<Stock> searchByCompanyName(@RequestParam String name) {
    return stockService.searchByCompanyName(name);
}

@GetMapping("/filter/above")
public List<Stock> getStocksAbovePrice(@RequestParam Double price) {
    return stockService.getStocksAbovePrice(price);
}

@GetMapping("/filter/below")
public List<Stock> getStocksBelowPrice(@RequestParam Double price) {
    return stockService.getStocksBelowPrice(price);
}

@GetMapping("/sort/price-asc")
public List<Stock> sortStocksByPriceAsc() {
    return stockService.sortStocksByPriceAsc();
}

@GetMapping("/sort/price-desc")
public List<Stock> sortStocksByPriceDesc() {
    return stockService.sortStocksByPriceDesc();
}
}
package com.tradearena.backend.controller;

import com.tradearena.backend.entity.Wallet;
import com.tradearena.backend.service.WalletService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin(origins = "*")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @PostMapping("/create/{userId}/{seasonId}")
    public Wallet createWallet(@PathVariable Long userId,
                               @PathVariable Long seasonId) {
        return walletService.createWallet(userId, seasonId);
    }

    @GetMapping("/{userId}/{seasonId}")
    public Wallet getWallet(@PathVariable Long userId,
                            @PathVariable Long seasonId) {
        return walletService.getWallet(userId, seasonId);
    }

    @PutMapping("/add/{userId}/{seasonId}")
    public Wallet addFunds(@PathVariable Long userId,
                           @PathVariable Long seasonId,
                           @RequestParam Double amount) {
        return walletService.addFunds(userId, seasonId, amount);
    }
}
package com.tradearena.backend.service;

import com.tradearena.backend.entity.Season;
import com.tradearena.backend.entity.User;
import com.tradearena.backend.entity.Wallet;
import com.tradearena.backend.repository.SeasonRepository;
import com.tradearena.backend.repository.UserRepository;
import com.tradearena.backend.repository.WalletRepository;
import org.springframework.stereotype.Service;

@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;
    private final SeasonRepository seasonRepository;

    public WalletService(WalletRepository walletRepository,
                         UserRepository userRepository,
                         SeasonRepository seasonRepository) {
        this.walletRepository = walletRepository;
        this.userRepository = userRepository;
        this.seasonRepository = seasonRepository;
    }

    public Wallet createWallet(Long userId, Long seasonId) {
        User user = userRepository.findById(userId).orElse(null);
        Season season = seasonRepository.findById(seasonId).orElse(null);

        if (user == null || season == null) {
            return null;
        }

        if (walletRepository.findByUserAndSeason(user, season).isPresent()) {
            return walletRepository.findByUserAndSeason(user, season).get();
        }

        Wallet wallet = new Wallet();
        wallet.setUser(user);
        wallet.setSeason(season);
        wallet.setCashBalance(season.getStartingBalance());
        wallet.setTotalInvested(0.0);

        return walletRepository.save(wallet);
    }

    public Wallet getWallet(Long userId, Long seasonId) {
        User user = userRepository.findById(userId).orElse(null);
        Season season = seasonRepository.findById(seasonId).orElse(null);

        if (user == null || season == null) {
            return null;
        }

        return walletRepository.findByUserAndSeason(user, season).orElse(null);
    }

    public Wallet addFunds(Long userId, Long seasonId, Double amount) {
        Wallet wallet = getWallet(userId, seasonId);

        if (wallet == null) {
            return null;
        }

        wallet.setCashBalance(wallet.getCashBalance() + amount);
        return walletRepository.save(wallet);
    }
}
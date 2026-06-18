package com.tradearena.backend.service;

import com.tradearena.backend.entity.Season;
import com.tradearena.backend.repository.SeasonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeasonService {

    private final SeasonRepository seasonRepository;

    public SeasonService(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    public Season createSeason(Season season) {
        return seasonRepository.save(season);
    }

    public List<Season> getAllSeasons() {
        return seasonRepository.findAll();
    }

    public Season getSeasonById(Long id) {
        return seasonRepository.findById(id).orElse(null);
    }

    public Season updateSeason(Long id, Season updatedSeason) {
        Season season = seasonRepository.findById(id).orElse(null);

        if (season == null) {
            return null;
        }

        season.setName(updatedSeason.getName());
        season.setStartDate(updatedSeason.getStartDate());
        season.setEndDate(updatedSeason.getEndDate());
        season.setStartingBalance(updatedSeason.getStartingBalance());
        season.setStatus(updatedSeason.getStatus());

        return seasonRepository.save(season);
    }

    public void deleteSeason(Long id) {
        seasonRepository.deleteById(id);
    }
}
package com.tradearena.backend.controller;

import com.tradearena.backend.entity.Season;
import com.tradearena.backend.service.SeasonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seasons")
@CrossOrigin(origins = "*")
public class SeasonController {

    private final SeasonService seasonService;

    public SeasonController(SeasonService seasonService) {
        this.seasonService = seasonService;
    }

    @PostMapping
    public Season createSeason(@RequestBody Season season) {
        return seasonService.createSeason(season);
    }

    @GetMapping
    public List<Season> getAllSeasons() {
        return seasonService.getAllSeasons();
    }

    @GetMapping("/{id}")
    public Season getSeasonById(@PathVariable Long id) {
        return seasonService.getSeasonById(id);
    }

    @PutMapping("/{id}")
    public Season updateSeason(@PathVariable Long id, @RequestBody Season season) {
        return seasonService.updateSeason(id, season);
    }

    @DeleteMapping("/{id}")
    public String deleteSeason(@PathVariable Long id) {
        seasonService.deleteSeason(id);
        return "Season deleted successfully";
    }
}
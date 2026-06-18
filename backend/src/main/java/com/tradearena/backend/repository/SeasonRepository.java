package com.tradearena.backend.repository;

import com.tradearena.backend.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SeasonRepository extends JpaRepository<Season, Long> {

    Optional<Season> findFirstByStatusIgnoreCase(String status);
}
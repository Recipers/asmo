package com.recipers.asmo.game_history.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.recipers.asmo.game_history.entity.GameHistory;

public interface GameHistoryRepository extends JpaRepository<GameHistory, Long>{
}

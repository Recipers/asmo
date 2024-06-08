package com.recipers.asmo.game_history.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.recipers.asmo.game_history.entity.GameHistory;

public interface GameHistoryRepository extends JpaRepository<GameHistory, Long>{

    Optional<GameHistory> findByGameId(Long gameId);
    Page<GameHistory> findByWinnerTeamIdOrLoserTeamId(Long winnerTeamId, Long loserTeamId, Pageable pageable);

}

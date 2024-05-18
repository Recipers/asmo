package com.recipers.asmo.game_history.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.recipers.asmo.game_history.entity.GameHistory;
import com.recipers.asmo.game_history.repository.GameHistoryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameHistoryService {

    private final GameHistoryRepository gameHistoryRepository;

    public Optional<GameHistory> findGameHistory(Long id) {
        return gameHistoryRepository.findById(id);
    }

    public Page<GameHistory> findGameHistoriesByTeamId(Long teamId, Pageable pageable) {
        return gameHistoryRepository.findByWinnerTeamIdOrLoserTeamId(teamId, teamId, pageable);
    }

}

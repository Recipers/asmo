package com.recipers.asmo.game_history.controller;

import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.recipers.asmo.game_history.entity.GameHistory;
import com.recipers.asmo.game_history.service.GameHistoryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/game-histories")
@RequiredArgsConstructor
public class GameHistoryController {

    private final GameHistoryService gameHistoryService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<GameHistory> findGameHistory(@PathVariable("id") Long id) {
        Optional<GameHistory> gameHistoryOpt = gameHistoryService.findGameHistory(id);

        if (gameHistoryOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        GameHistory gameHistory = gameHistoryOpt.get();

        return ResponseEntity.status(HttpStatus.OK).body(gameHistory);
    }

}

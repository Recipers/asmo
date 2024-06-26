package com.recipers.asmo.game_history.controller;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.recipers.asmo.auth.interceptor.AsmoSession;
import com.recipers.asmo.game_history.dto.GameHistoryCreateRequest;
import com.recipers.asmo.game_history.entity.GameHistory;
import com.recipers.asmo.game_history.service.GameHistoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "")
@RequiredArgsConstructor
public class GameHistoryController {

    private final GameHistoryService gameHistoryService;

    @PostMapping(path = "/game-histories")
    public ResponseEntity<Void> createGameHistory(
        @RequestBody @Valid GameHistoryCreateRequest request
    ) {
        Long userId = AsmoSession.REQUEST_SCOPE.getUserId();

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        gameHistoryService.createGameHistory(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping(path = "/game-histories/{id}")
    public ResponseEntity<GameHistory> findGameHistory(@PathVariable("id") Long id) {
        Optional<GameHistory> gameHistoryOpt = gameHistoryService.findGameHistory(id);

        if (gameHistoryOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        GameHistory gameHistory = gameHistoryOpt.get();

        return ResponseEntity.status(HttpStatus.OK).body(gameHistory);
    }

    @GetMapping(path = "/teams/{teamId}/game-histories")
    public ResponseEntity<Page<GameHistory>> findGameHistoryByTeamId(@PathVariable("teamId") Long teamId,
        @PageableDefault(size = 10, page = 0) Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(gameHistoryService.findGameHistoriesByTeamId(teamId, pageable));
    }

}

package com.recipers.asmo.game.controller;

import com.recipers.asmo.game.dto.GameCreateRequest;
import com.recipers.asmo.game.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping(path = "")
    public ResponseEntity<Void> createGame(
        @RequestBody @Valid GameCreateRequest gameCreateRequest) {

        gameService.createGame(gameCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}

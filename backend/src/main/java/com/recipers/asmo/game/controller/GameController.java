package com.recipers.asmo.game.controller;

import com.recipers.asmo.game.dto.GameCreateRequest;
import com.recipers.asmo.game.dto.GameInformation;
import com.recipers.asmo.game.entity.Game;
import com.recipers.asmo.game.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    @GetMapping(value = "")
    public ResponseEntity<Page<GameInformation>> findGames(
        @PageableDefault(size = 10, page = 0)
        Pageable pageable) {

        Page<GameInformation> gameInformationPage = gameService.findGames(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(gameInformationPage);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Game> findGame(@PathVariable(value = "id") Long id) {

        Game game = gameService.findGame(id);
        return ResponseEntity.status(HttpStatus.OK).body(game);
    }

}

package com.recipers.asmo.game_proposal.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.recipers.asmo.auth.interceptor.AsmoSession;
import com.recipers.asmo.game_proposal.dto.GameProposalCreateRequest;
import com.recipers.asmo.game_proposal.entity.GameProposal;
import com.recipers.asmo.game_proposal.service.GameProposalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "")
@RequiredArgsConstructor
public class GameProposalController {

    private final GameProposalService gameProposalService;

    @PostMapping(path = "/game-proposals")
    public ResponseEntity<Void> createGameProposal(
        @RequestBody @Valid GameProposalCreateRequest request
    ) {
        Long userId = AsmoSession.REQUEST_SCOPE.getUserId();

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        gameProposalService.createGameProposal(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping(path = "/games/{gameId}/game-proposals")
    public ResponseEntity<Page<GameProposal>> findAllGameProposals(@PageableDefault(size = 10, page = 0) Pageable pageable, @PathVariable("gameId") Long gameId) {
        return ResponseEntity.status(HttpStatus.OK).body(gameProposalService.findGameProposalsByGame(pageable, gameId));
    }

    @PutMapping(path = "/game-proposals/{gameProposalId}/accept")
    public ResponseEntity<Void> acceptGameProposal(@PathVariable("gameProposalId") Long gameProposalId) {
        Long userId = AsmoSession.REQUEST_SCOPE.getUserId();

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        gameProposalService.acceptGameProposal(userId, gameProposalId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}

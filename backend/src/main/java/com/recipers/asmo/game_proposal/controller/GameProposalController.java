package com.recipers.asmo.game_proposal.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.recipers.asmo.auth.interceptor.AsmoSession;
import com.recipers.asmo.game_proposal.dto.GameProposalCreateRequest;
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

}

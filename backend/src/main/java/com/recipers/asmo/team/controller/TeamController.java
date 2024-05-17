package com.recipers.asmo.team.controller;

import com.recipers.asmo.team.dto.TeamCreateRequest;
import com.recipers.asmo.team.service.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @PostMapping(path = "")
    public ResponseEntity<Void> createTeam(@RequestBody @Valid TeamCreateRequest teamCreateRequest) {
        teamService.createTeam(teamCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}

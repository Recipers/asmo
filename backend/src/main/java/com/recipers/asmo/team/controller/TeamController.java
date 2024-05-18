package com.recipers.asmo.team.controller;

import com.recipers.asmo.auth.interceptor.AsmoSession;
import com.recipers.asmo.team.dto.TeamCreateRequest;
import com.recipers.asmo.team.entity.Team;
import com.recipers.asmo.team.service.TeamService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/teams")
@RequiredArgsConstructor
@Slf4j
public class TeamController {

    private final TeamService teamService;

    @GetMapping(path = "")
    public ResponseEntity<Page<Team>> findAllTeams(@PageableDefault(size = 10, page = 0) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(teamService.findAllTeams(pageable));
    }

    @PostMapping(path = "")
    public ResponseEntity<Void> createTeam(@RequestBody @Valid TeamCreateRequest teamCreateRequest, HttpServletRequest request) {
        Long userId = AsmoSession.REQUEST_SCOPE.getUserId();

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        teamService.createTeam(userId, teamCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}

package com.recipers.asmo.team_join.controller;

import com.recipers.asmo.auth.interceptor.AsmoSession;
import com.recipers.asmo.team_join.service.TeamJoinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/team-joins")
@RequiredArgsConstructor
@Slf4j
public class TeamJoinController {

    private final TeamJoinService teamJoinService;

    @PostMapping("/{teamId}")
    public ResponseEntity<String> addTeamMember(@PathVariable(value = "teamId") Long teamId) {
        Long requestUserId = AsmoSession.REQUEST_SCOPE.getUserId();

        if (requestUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        teamJoinService.addTeamMember(requestUserId, teamId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/accept/{userId}")
    public ResponseEntity<String> acceptTeamJoinRequest(@PathVariable("userId") Long userId) {
        Long requestUserId = AsmoSession.REQUEST_SCOPE.getUserId();

        if (requestUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        teamJoinService.acceptTeamJoinRequest(requestUserId, userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}

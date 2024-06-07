package com.recipers.asmo.team_member.controller;

import com.recipers.asmo.auth.interceptor.AsmoSession;
import com.recipers.asmo.team_member.service.TeamMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team-members")
@RequiredArgsConstructor
@Slf4j
public class TeamMemberController {

    private final TeamMemberService teamMemberService;

    @DeleteMapping("{teamMemberId}")
    public ResponseEntity<Void> deleteTeamMember(@PathVariable Long teamMemberId) {
        Long requestUserId = AsmoSession.REQUEST_SCOPE.getUserId();

        if (requestUserId == null || teamMemberId == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        teamMemberService.deleteTeamMember(requestUserId, teamMemberId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}

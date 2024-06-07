package com.recipers.asmo.team_member.service;

import com.recipers.asmo.exception.CommonException;
import com.recipers.asmo.team_member.entity.TeamMember;
import com.recipers.asmo.team_member.eums.Role;
import com.recipers.asmo.team_member.repository.TeamMemberRepository;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamMemberService {

    private final TeamMemberRepository teamMemberRepository;

    public void checkRole(Long userId, Long teamId, Role[] allowedRoles) {

        TeamMember teamMember = teamMemberRepository.findByTeamIdAndUserId(teamId, userId)
            .orElseThrow(() -> new CommonException(HttpStatus.FORBIDDEN, ""));
        boolean hasRole = Stream.of(allowedRoles).filter(role -> role.equals(teamMember.getRole()))
            .findAny().isPresent();
        if (!hasRole) {
            throw new CommonException(HttpStatus.FORBIDDEN, "");
        }
    }
}

package com.recipers.asmo.team_member.service;

import com.recipers.asmo.exception.CommonException;
import com.recipers.asmo.team_member.entity.TeamMember;
import com.recipers.asmo.team_member.eums.Role;
import com.recipers.asmo.team_member.repository.TeamMemberRepository;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamMemberService {

    private final TeamMemberRepository teamMemberRepository;

    public void checkRole(Long userId, Long teamId, Role[] allowedRoles) {

        TeamMember teamMember = teamMemberRepository.findByTeamIdAndUserId(teamId, userId)
                .orElseThrow(() -> new CommonException(HttpStatus.FORBIDDEN, ""));
        boolean hasRole = Stream.of(allowedRoles).anyMatch(role -> role.equals(teamMember.getRole()));
        if (!hasRole) {
            throw new CommonException(HttpStatus.FORBIDDEN, "");
        }
    }

    public void deleteTeamMember(Long requestUserId, Long teamMemberId) {

        TeamMember targetTeamMember = teamMemberRepository.findById(teamMemberId)
                .orElseThrow(() -> new CommonException(HttpStatus.NOT_FOUND, "해당 팀 멤버가 존재하지 않습니다."));

        Long teamId = targetTeamMember.getTeamId();

        TeamMember requestTeamMember = teamMemberRepository.findByTeamIdAndUserId(teamId, requestUserId)
                .orElseThrow(() -> new CommonException(HttpStatus.NOT_FOUND, "해당 팀 멤버가 존재하지 않습니다."));

        if (requestUserId.equals(targetTeamMember.getUserId())) {
            throw new CommonException(HttpStatus.UNAUTHORIZED, "자신을 추방할 수 없습니다.");
        }

        if (requestTeamMember.getRole() == Role.MEMBER) {
            throw new CommonException(HttpStatus.UNAUTHORIZED, "추방은 매니저 또는 코치만 가능합니다.");
        }

        teamMemberRepository.delete(targetTeamMember);
    }
}

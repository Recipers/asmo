package com.recipers.asmo.team_join.service;

import com.recipers.asmo.exception.CommonException;
import com.recipers.asmo.team.repository.TeamRepository;
import com.recipers.asmo.team_join.entity.TeamJoin;
import com.recipers.asmo.team_join.enums.TeamJoinStatus;
import com.recipers.asmo.team_join.repository.TeamJoinRepository;
import com.recipers.asmo.team_member.entity.TeamMember;
import com.recipers.asmo.team_member.eums.Role;
import com.recipers.asmo.team_member.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamJoinService {

    private final TeamJoinRepository teamJoinRepository;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;

    @Transactional(rollbackFor = Exception.class)
    public void addTeamMember(Long requestUserId, Long teamId) {

        teamRepository.findById(teamId)
                .orElseThrow(() -> new CommonException(HttpStatus.NOT_FOUND, "존재하지 않는 팀 입니다."));

        if (teamMemberRepository.existsByUserIdAndTeamId(requestUserId, teamId)) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "이미 가입된 팀입니다.");
        }

        if (teamJoinRepository.existsByUserIdAndTargetTeamId(requestUserId, teamId)) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "이미 가입 신청 진행 중입니다.");
        }

        TeamJoin newTeamJoin = TeamJoin.builder()
                .userId(requestUserId)
                .targetTeamId(teamId)
                .status(TeamJoinStatus.PENDING)
                .build();

        teamJoinRepository.save(newTeamJoin);

    }

    @Transactional(rollbackFor = Exception.class)
    public void acceptTeamJoinRequest(Long reqUserId, Long userId) {

        TeamMember reqTeamMember = teamMemberRepository.findByUserId(reqUserId)
                .orElseThrow(() -> new CommonException(HttpStatus.NOT_FOUND, "팀 멤버가 아닙니다."));

        if (reqTeamMember.getRole() == Role.MEMBER) {
            throw new CommonException(HttpStatus.UNAUTHORIZED, "가입 시킬 수 있는 권한이 없습니다.");
        }

        TeamJoin teamJoin = teamJoinRepository.findByTargetTeamIdAndUserId(reqTeamMember.getTeamId(), userId)
                .orElseThrow(() -> new CommonException(HttpStatus.NOT_FOUND, "가입 신청 내역이 존재하지 않습니다."));

        if (teamJoin.getStatus() == TeamJoinStatus.ACCEPTED) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "이미 가입된 팀입니다.");
        }

        teamJoin.approveJoinRequest(TeamJoinStatus.ACCEPTED);
        teamJoinRepository.save(teamJoin);
        teamMemberRepository.save(TeamMember.builder()
                .teamId(reqTeamMember.getTeamId())
                .userId(userId)
                .role(Role.MEMBER)
                .build());

    }
}

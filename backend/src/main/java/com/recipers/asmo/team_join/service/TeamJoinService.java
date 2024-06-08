package com.recipers.asmo.team_join.service;

import com.recipers.asmo.exception.CommonException;
import com.recipers.asmo.team.repository.TeamRepository;
import com.recipers.asmo.team_join.entity.TeamJoin;
import com.recipers.asmo.team_join.enums.TeamJoinStatus;
import com.recipers.asmo.team_join.repository.TeamJoinRepository;
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

}

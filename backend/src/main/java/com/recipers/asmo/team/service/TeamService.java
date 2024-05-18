package com.recipers.asmo.team.service;

import com.recipers.asmo.team.dto.TeamCreateRequest;
import com.recipers.asmo.team.entity.Team;
import com.recipers.asmo.team.mapper.TeamMapper;
import com.recipers.asmo.team.repository.TeamRepository;
import com.recipers.asmo.team_member.entity.TeamMember;
import com.recipers.asmo.team_member.eums.Role;
import com.recipers.asmo.team_member.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;

    @Transactional(rollbackFor = Exception.class)
    public void createTeam(Long userId, TeamCreateRequest teamCreateRequest) {
        Team team = teamMapper.toTeam(teamCreateRequest);
        teamRepository.save(team);

        TeamMember teamMember = TeamMember.builder()
                .teamId(team.getId())
                .userId(userId)
                .role(Role.MANAGER)
                .build();
        teamMemberRepository.save(teamMember);
    }

    public Page<Team> findAllTeams(Pageable pageable) {
        return teamRepository.findAll(pageable);
    }
}

package com.recipers.asmo.team.service;

import com.recipers.asmo.team.dto.TeamCreateRequest;
import com.recipers.asmo.team.entity.Team;
import com.recipers.asmo.team.mapper.TeamMapper;
import com.recipers.asmo.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;

    public void createTeam(TeamCreateRequest teamCreateRequest) {
        Team team = teamMapper.toTeam(teamCreateRequest);
        teamRepository.save(team);
    }

    public Page<Team> findAllTeams(Pageable pageable) {
        return teamRepository.findAll(pageable);
    }
}

package com.recipers.asmo.game.service;

import com.recipers.asmo.auth.interceptor.AsmoSession;
import com.recipers.asmo.game.dto.GameCreateRequest;
import com.recipers.asmo.game.entity.Game;
import com.recipers.asmo.game.mapper.GameMapper;
import com.recipers.asmo.game.repository.GameRepository;
import com.recipers.asmo.team_member.eums.Role;
import com.recipers.asmo.team_member.service.TeamMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    private final GameMapper gameMapper;

    private final TeamMemberService teamMemberService;

    public void createGame(GameCreateRequest gameCreateRequest) {

        Long userId = AsmoSession.REQUEST_SCOPE.getUserId();
        Long teamId = gameCreateRequest.getHostTeamId();
        Game game = gameMapper.toGameFromCreateRequest(gameCreateRequest);
        teamMemberService.checkRole(userId, teamId, new Role[]{Role.MANAGER});
        gameRepository.save(game);
    }

}

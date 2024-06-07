package com.recipers.asmo.game_proposal.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.recipers.asmo.exception.CommonException;
import com.recipers.asmo.game.entity.Game;
import com.recipers.asmo.game.repository.GameRepository;
import com.recipers.asmo.game_proposal.dto.GameProposalCreateRequest;
import com.recipers.asmo.game_proposal.entity.GameProposal;
import com.recipers.asmo.game_proposal.mapper.GameProposalMapper;
import com.recipers.asmo.game_proposal.repository.GameProposalRepository;
import com.recipers.asmo.team_member.entity.TeamMember;
import com.recipers.asmo.team_member.eums.Role;
import com.recipers.asmo.team_member.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameProposalService {

    private final TeamMemberRepository teamMemberRepository;
    private final GameRepository gameRepository;
    private final GameProposalRepository gameProposalRepository;
    private final GameProposalMapper gameProposalMapper;

    public void createGameProposal(Long userId, GameProposalCreateRequest gameProposalCreateRequest) {
        Game game = gameRepository
            .findById(gameProposalCreateRequest.getGameId())
            .orElseThrow(() -> new CommonException(HttpStatus.NOT_FOUND, "Game not found"));

        if (game.getHostTeamId() == gameProposalCreateRequest.getTeamId()) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "You can't propose a game to your own team");
        }

        TeamMember teamMember = teamMemberRepository
            .findById(userId)
            .orElseThrow(() -> new CommonException(HttpStatus.FORBIDDEN, "TeamMember not found"));

        if (teamMember.getRole() != Role.MANAGER && teamMember.getRole() != Role.COACH) {
            throw new CommonException(HttpStatus.FORBIDDEN, "You are not allowed to create a game proposal");
        }

        GameProposal gameProposal = gameProposalMapper.toGameProposal(gameProposalCreateRequest);
        gameProposalRepository.save(gameProposal);
    }

    public Page<GameProposal> findGameProposalsByGame(Pageable pageable, Long gameId) {
        return gameProposalRepository.findByGameId(pageable, gameId);
    }

}

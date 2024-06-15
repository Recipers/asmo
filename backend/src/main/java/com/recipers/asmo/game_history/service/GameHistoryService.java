package com.recipers.asmo.game_history.service;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.recipers.asmo.exception.CommonException;
import com.recipers.asmo.game.entity.Game;
import com.recipers.asmo.game.repository.GameRepository;
import com.recipers.asmo.game_history.dto.GameHistoryCreateRequest;
import com.recipers.asmo.game_history.entity.GameHistory;
import com.recipers.asmo.game_history.mapper.GameHistoryMapper;
import com.recipers.asmo.game_history.repository.GameHistoryRepository;
import com.recipers.asmo.team.entity.Team;
import com.recipers.asmo.team.repository.TeamRepository;
import com.recipers.asmo.team_member.entity.TeamMember;
import com.recipers.asmo.team_member.repository.TeamMemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameHistoryService {

    private final GameHistoryRepository gameHistoryRepository;
    private final GameRepository gameRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final GameHistoryMapper gameHistoryMapper;
    private final TeamRepository teamRepository;

    @Transactional
    public void createGameHistory(Long userId, GameHistoryCreateRequest request) {
        Game game = gameRepository.findById(request.getGameId())
            .orElseThrow(() -> new CommonException(HttpStatus.NOT_FOUND, "Game not found"));

        if ((!game.getHostTeamId().equals(request.getWinnerTeamId()) && !game.getGuestTeamId().equals(request.getWinnerTeamId())) ||
            (!game.getHostTeamId().equals(request.getLoserTeamId())  && !game.getGuestTeamId().equals(request.getLoserTeamId()))) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "Winner or Loser team id is not matched with game");
        }

        if (request.getWinnerTeamId().equals(request.getLoserTeamId())) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "Winner and Loser team id is same");
        }

        GameHistory already = gameHistoryRepository.findByGameId(request.getGameId())
            .orElse(null);

        if (already != null) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "Game history already exists");
        }

        TeamMember hostTeamMember = teamMemberRepository
            .findByTeamIdAndUserId(game.getHostTeamId(), userId)
            .orElse(null);
        TeamMember guestTeamMember = teamMemberRepository
            .findByTeamIdAndUserId(game.getGuestTeamId(), userId)
            .orElse(null);

        if (hostTeamMember == null && guestTeamMember == null) {
            throw new CommonException(HttpStatus.FORBIDDEN, "You are not allowed to create a game history");
        }

        if (game.getEndAt().isAfter(LocalDateTime.now())) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "Game is not finished yet");
        }

        GameHistory gameHistory = gameHistoryMapper.toGameHistory(request);
        Team winnerTeam = teamRepository.findById(request.getWinnerTeamId()).get();
        Team loserTeam = teamRepository.findById(request.getLoserTeamId()).get();

        winnerTeam.win();
        loserTeam.lose();

        gameHistoryRepository.save(gameHistory);
        teamRepository.save(winnerTeam);
        teamRepository.save(loserTeam);
    }

    public Optional<GameHistory> findGameHistory(Long id) {
        return gameHistoryRepository.findById(id);
    }

    public Page<GameHistory> findGameHistoriesByTeamId(Long teamId, Pageable pageable) {
        return gameHistoryRepository.findByWinnerTeamIdOrLoserTeamId(teamId, teamId, pageable);
    }

}

package com.recipers.asmo.game_proposal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.recipers.asmo.game_proposal.entity.GameProposal;

public interface GameProposalRepository extends JpaRepository<GameProposal, Long> {
    Page<GameProposal> findByGameId(Pageable pageable, Long gameId);
}

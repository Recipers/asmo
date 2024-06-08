package com.recipers.asmo.team_join.repository;

import com.recipers.asmo.team_join.entity.TeamJoin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamJoinRepository extends JpaRepository<TeamJoin, Long> {
    boolean existsByUserIdAndTargetTeamId(Long requestUserId, Long teamId);
}

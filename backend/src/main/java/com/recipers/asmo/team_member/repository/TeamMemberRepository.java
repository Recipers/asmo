package com.recipers.asmo.team_member.repository;

import com.recipers.asmo.team_member.entity.TeamMember;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {

    Optional<TeamMember> findByTeamIdAndUserId(Long teamId, Long userId);

    boolean existsByUserIdAndTeamId(Long requestUserId, Long teamId);

    Optional<TeamMember> findByUserId(Long reqUserId);
}

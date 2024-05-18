package com.recipers.asmo.team_member.repository;

import com.recipers.asmo.team_member.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
}

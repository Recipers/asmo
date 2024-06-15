package com.recipers.asmo.team_join.entity;

import com.recipers.asmo.team_join.enums.TeamJoinStatus;
import com.recipers.asmo.util.jpa.EnumConverters;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "team_join")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TeamJoin {

    @Builder
    public TeamJoin(Long userId, Long targetTeamId, TeamJoinStatus status) {
        this.userId = userId;
        this.targetTeamId = targetTeamId;
        this.status = status;
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "target_team_id", nullable = false)
    private Long targetTeamId;

    // "대기": PENDING | "수락": ACCEPTED | "거절": REJECTED
    @Column(name = "status", nullable = false)
    @Convert(converter = EnumConverters.TeamJoinStatusConverter.class)
    private TeamJoinStatus status;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    public void approveJoinRequest(TeamJoinStatus accepted) {
        this.status = accepted;
    }

}

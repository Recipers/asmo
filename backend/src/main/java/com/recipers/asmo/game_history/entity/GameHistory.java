package com.recipers.asmo.game_history.entity;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "game_history")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class GameHistory {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "game_id", nullable = false)
    private Long gameId;

    @Column(name = "winner_team_id", nullable = false)
    private Long winnerTeamId;

    @Column(name = "loser_team_id", nullable = false)
    private Long loserTeamId;

    @Column(name = "winner_score", nullable = false)
    private int winnerScore;

    @Column(name = "loser_score", nullable = false)
    private int loserScore;

    @Column(name = "is_draw", nullable = false)
    private Boolean isDraw;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

}

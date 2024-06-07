package com.recipers.asmo.game_proposal.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "game_proposal", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"game_id", "team_id"})
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class GameProposal {

    public GameProposal(long gameId, long teamId, String description) {
        this.gameId = gameId;
        this.teamId = teamId;
        this.description = description;
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "game_id", nullable = false)
    private Long gameId;

    @Column(name = "team_id", nullable = false)
    private Long teamId;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "accepted", nullable = false)
    private Boolean accepted = false;

    @CreationTimestamp
    @Column(name = "create_at", nullable = false)
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

}

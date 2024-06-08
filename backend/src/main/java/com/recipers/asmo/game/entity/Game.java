package com.recipers.asmo.game.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.http.HttpStatus;
import com.recipers.asmo.exception.CommonException;

@Entity
@Table(name = "game")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Game {

    @Builder
    public Game(String title, LocalDateTime startAt, LocalDateTime endAt, String region,
        String location, Integer fee, String description, Long hostTeamId) {
        this.title = title;
        this.startAt = startAt;
        this.endAt = endAt;
        this.region = region;
        this.location = location;
        this.fee = fee;
        this.description = description;
        this.hostTeamId = hostTeamId;
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "start_at", nullable = false)
    private LocalDateTime startAt;

    @Column(name = "end_at", nullable = false)
    private LocalDateTime endAt;

    @Column(name = "canceled", nullable = false)
    private Boolean canceled = false;

    @Column(name = "region", nullable = false)
    private String region;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "fee", nullable = false)
    private Integer fee;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "host_team_id", nullable = false)
    private Long hostTeamId;

    @Column(name = "guest_team_id")
    private Long guestTeamId;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public void setGuestTeamId(Long guestTeamId) {
        if (this.guestTeamId != null) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "This game already has a guest team");
        }

        this.guestTeamId = guestTeamId;
    }

}

package com.recipers.asmo.config.match.entity;

import java.time.LocalDateTime;
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
@Table(name = "game")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Game {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "match_date", nullable = false)
    private LocalDateTime matchDate;

    @Column(name = "region", nullable = false)
    private String region;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "fee", nullable = false)
    private Integer fee;

    @Column(name = "description")
    private String description;

    @Column(name = "host_team_id", nullable = false)
    private Long hostTeamId;

    @Column(name = "guest_team_id")
    private Long guestTeamId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

}

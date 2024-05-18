package com.recipers.asmo.team_member.entity;

import java.time.LocalDateTime;

import com.recipers.asmo.team_member.eums.Role;
import com.recipers.asmo.util.jpa.EnumConverters;
import jakarta.persistence.*;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "team_member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TeamMember {

    @Builder
    public TeamMember(Long teamId, Long userId, Role role) {
        this.teamId = teamId;
        this.userId = userId;
        this.role = role;
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "team_id", nullable = false)
    private Long teamId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    // "감독": manager | "코치": coach | "팀원": member
    @Column(name = "role", nullable = false)
    @Convert(converter= EnumConverters.RoleConverter.class)
    private Role role;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

}

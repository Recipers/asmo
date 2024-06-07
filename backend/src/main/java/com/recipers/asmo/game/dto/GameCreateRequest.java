package com.recipers.asmo.game.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class GameCreateRequest {

    @NotBlank
    private String title;

    @NotNull
    private LocalDateTime startAt;

    @NotNull
    private LocalDateTime endAt;

    @NotBlank
    private String region;

    @NotBlank
    private String location;

    @NotNull
    @PositiveOrZero
    private Integer fee;

    @NotBlank
    private String description;

    @NotNull
    private Long hostTeamId;

}

package com.recipers.asmo.game_history.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GameHistoryCreateRequest {

    @NotNull
    private Long gameId;

    @NotNull
    private Long winnerTeamId;

    @NotNull
    private Long loserTeamId;

    @NotNull
    private Boolean isDraw;

}

package com.recipers.asmo.game_proposal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GameProposalCreateRequest {

    @NotNull(message = "게임 ID는 필수입니다.")
    private Long gameId;

    @NotNull(message = "팀 ID는 필수입니다.")
    private Long teamId;

    @NotBlank(message = "설명은 필수입니다.")
    private String description;

}

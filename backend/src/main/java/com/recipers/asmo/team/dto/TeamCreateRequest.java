package com.recipers.asmo.team.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TeamCreateRequest {

    @NotBlank(message = "팀 이름은 필수입니다.")
    private String name;

    @NotBlank(message = "주 활동 지역은 필수입니다.")
    private String region;

    private String uniformColor;

}

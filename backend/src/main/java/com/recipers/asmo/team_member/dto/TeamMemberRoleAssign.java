package com.recipers.asmo.team_member.dto;

import com.recipers.asmo.team_member.eums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TeamMemberRoleAssign {

    @NotNull
    private Role role;

    @NotNull
    private Long teamMemberId;

}

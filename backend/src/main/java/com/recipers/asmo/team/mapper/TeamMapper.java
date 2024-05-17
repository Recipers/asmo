package com.recipers.asmo.team.mapper;

import com.recipers.asmo.team.dto.TeamCreateRequest;
import com.recipers.asmo.team.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TeamMapper {

    Team toTeam(TeamCreateRequest teamCreateRequest);

}

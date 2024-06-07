package com.recipers.asmo.game.mapper;

import com.recipers.asmo.game.dto.GameCreateRequest;
import com.recipers.asmo.game.entity.Game;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GameMapper {

    Game toGameFromCreateRequest(GameCreateRequest gameCreateRequest);

}

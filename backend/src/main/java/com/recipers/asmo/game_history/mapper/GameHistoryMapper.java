package com.recipers.asmo.game_history.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import com.recipers.asmo.game_history.dto.GameHistoryCreateRequest;
import com.recipers.asmo.game_history.entity.GameHistory;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GameHistoryMapper  {

    GameHistory toGameHistory(GameHistoryCreateRequest gameHistoryCreateRequest);

}

package com.recipers.asmo.game_proposal.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import com.recipers.asmo.game_proposal.dto.GameProposalCreateRequest;
import com.recipers.asmo.game_proposal.entity.GameProposal;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface GameProposalMapper {

    GameProposal toGameProposal(GameProposalCreateRequest gameProposalCreateRequest);

}

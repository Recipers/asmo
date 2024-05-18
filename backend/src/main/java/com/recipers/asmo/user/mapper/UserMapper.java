package com.recipers.asmo.user.mapper;

import com.recipers.asmo.auth.token.Claim;
import com.recipers.asmo.user.dto.UserSignUpRequest;
import com.recipers.asmo.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    User toUserFromSignUpRequest(UserSignUpRequest userSignUpRequest);

    @Mappings({@Mapping(source = "user.id", target = "userId")})
    Claim asClaimFromUserEntity(User user);

}

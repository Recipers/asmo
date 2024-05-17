package com.recipers.asmo.user.mapper;

import com.recipers.asmo.user.dto.UserSignUpRequest;
import com.recipers.asmo.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    User toUserFromSignUpRequest(UserSignUpRequest userSignUpRequest);

}

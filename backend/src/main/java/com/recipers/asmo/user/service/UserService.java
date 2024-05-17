package com.recipers.asmo.user.service;

import com.recipers.asmo.user.dto.UserSignUpRequest;
import com.recipers.asmo.user.entity.User;
import com.recipers.asmo.user.mapper.UserMapper;
import com.recipers.asmo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public User signUp(UserSignUpRequest userSignUpRequest) {

        User user = userMapper.toUserFromSignUpRequest(userSignUpRequest);
        return userRepository.save(user);
    }

}

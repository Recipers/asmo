package com.recipers.asmo.user.service;

import com.recipers.asmo.auth.token.Token;
import com.recipers.asmo.auth.token.TokenProvider;
import com.recipers.asmo.exception.CommonException;
import com.recipers.asmo.user.dto.UserSignInRequest;
import com.recipers.asmo.user.dto.UserSignUpRequest;
import com.recipers.asmo.user.entity.User;
import com.recipers.asmo.user.mapper.UserMapper;
import com.recipers.asmo.user.repository.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final TokenProvider tokenProvider;

    public User signUp(UserSignUpRequest userSignUpRequest) {

        userRepository.findByEmail(userSignUpRequest.getEmail()).ifPresent(user -> {
            throw new CommonException(HttpStatus.BAD_REQUEST, "이미 가입된 이메일입니다.");
        });
        equalsPassword(userSignUpRequest.getPassword(), userSignUpRequest.getPasswordForCheck());
        User user = userMapper.toUserFromSignUpRequest(userSignUpRequest);
        return userRepository.save(user);
    }

    public Token singIn(UserSignInRequest userSignInRequest) {

        User user = userRepository.findByEmail(userSignInRequest.getEmail())
            .orElseThrow(() -> new CommonException(HttpStatus.NOT_FOUND, ""));
        equalsPassword(userSignInRequest.getPassword(), user.getPassword());
        return tokenProvider.issueToken(userMapper.asClaimFromUserEntity(user));
    }

    public Token refresh(Token tokenDto) {

        Optional<Long> beforeUserId = tokenProvider.validateToken(tokenDto.getRefreshToken());
        if (beforeUserId.isEmpty()) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "");
        }
        User user = userRepository.findById(beforeUserId.get())
            .orElseThrow(() -> new CommonException(HttpStatus.NOT_FOUND, ""));
        return tokenProvider.issueToken(userMapper.asClaimFromUserEntity(user));
    }

    private void equalsPassword(String inputPassword, String entityPassword) {

        if (!inputPassword.equals(entityPassword)) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "");
        }
    }
}

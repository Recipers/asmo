package com.recipers.asmo.user.controller;

import com.recipers.asmo.auth.config.TokenConfig;
import com.recipers.asmo.auth.interceptor.AsmoSession;
import com.recipers.asmo.auth.token.Token;
import com.recipers.asmo.user.dto.UserSignInRequest;
import com.recipers.asmo.user.dto.UserSignUpRequest;
import com.recipers.asmo.user.entity.User;
import com.recipers.asmo.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(path = "/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody @Valid UserSignUpRequest signUpRequest) {

        userService.signUp(signUpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping(path = "/sign-in")
    public ResponseEntity<Token> signIn(@RequestBody @Valid UserSignInRequest signInRequest) {

        Token token = userService.singIn(signInRequest);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @DeleteMapping(path = "/logout")
    public ResponseEntity<Void> logout() {

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping(path = "/me")
    public ResponseEntity<User> signUp() {

        Long id = AsmoSession.REQUEST_SCOPE.getUserId();
        if(id == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        User user = userService.findUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping(path = "/refresh-token")
    public ResponseEntity<Token> refreshToken(
        @RequestHeader(value = HttpHeaders.AUTHORIZATION) String bearerToken) {

        Token refreshToken = userService.refresh(bearerToken);
        return ResponseEntity.status(HttpStatus.OK).body(refreshToken);
    }

}

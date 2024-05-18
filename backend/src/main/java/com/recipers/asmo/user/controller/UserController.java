package com.recipers.asmo.user.controller;

import com.recipers.asmo.auth.token.Token;
import com.recipers.asmo.user.dto.UserSignInRequest;
import com.recipers.asmo.user.dto.UserSignUpRequest;
import com.recipers.asmo.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

}

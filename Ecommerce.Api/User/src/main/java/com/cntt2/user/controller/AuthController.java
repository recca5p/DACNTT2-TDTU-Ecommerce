package com.cntt2.user.controller;

import com.cntt2.user.model.User;
import com.cntt2.user.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/v1/auth")
public record AuthController(AuthService authService) {
    //sign in
    @PostMapping(path = "signin")
    public User signIn(@RequestBody AuthRequest.SignInRequest signInRequestRequest) {
        return authService.signIn(signInRequestRequest);
    }

    //sign up
    @PostMapping(path = "signup")
    public User signUp(@RequestBody AuthRequest.SignUpRequest signUpRequest) {
        return authService.signUp((signUpRequest));
    }
}

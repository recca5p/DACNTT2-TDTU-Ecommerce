package com.cntt2.user.controller;

import com.cntt2.user.dto.AuthResponse;
import com.cntt2.user.model.User;
import com.cntt2.user.security.TokenManager;
import com.cntt2.user.service.AuthService;
import com.cntt2.user.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenManager tokenManager;

    //sign in
    @PostMapping(path = "signin")
    public AuthResponse signIn(@RequestBody AuthRequest.SignInRequest signInRequestRequest) {
        return authService.signIn(signInRequestRequest);
    }

    //sign up
    @PostMapping(path = "signup")
    public AuthResponse signUp(@RequestBody AuthRequest.SignUpRequest signUpRequest) {
        return authService.signUp((signUpRequest));
    }

    @GetMapping(value = {"authenticate"})
    public ResponseEntity<UserDetails> authenticate(@RequestParam(name = "token", required = true) String tokenHeader) throws Exception {
//        String userId = null;
//        String token = null;
//
//        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
//            token = tokenHeader.substring(7);
//            try {
//                userId = tokenManager.getUserIDFromToken(token);
//            } catch (IllegalArgumentException e) {
//                throw new IllegalStateException("Unable to get JWT Token");
//            } catch (ExpiredJwtException e) {
//                throw new IllegalStateException("JWT Token has expired");
//            }
//        } else {
//            throw new IllegalStateException("Bearer String not found in token");
//        }
//
//        if (null != userId) {
//            User userData = userService.getSingleUser(userId);
//            if (tokenManager.validateJwtToken(token) && userData != null) {
//                return new ResponseEntity<UserDetails>(userData, HttpStatus.OK);
//            }
//        }
        UserDetails userData = authService.checkAuth(tokenHeader);

        if(userData != null) {
            return new ResponseEntity<UserDetails>(userData, HttpStatus.OK);
        }

        return new ResponseEntity<UserDetails>(HttpStatus.BAD_REQUEST);
    }
}

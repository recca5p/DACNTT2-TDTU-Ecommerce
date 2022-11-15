package com.cntt2.user.service;

import com.cntt2.user.controller.AuthRequest;
import com.cntt2.user.model.User;
import com.cntt2.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public record AuthService(UserRepository userRepository) {

    public User signIn(AuthRequest.SignInRequest request) {
        User userData = userRepository.findByUsername(request.username());
        if(userData == null) {
            throw new IllegalStateException("Username is not correct!");
        }
        if(!userData.getPassword().equals(request.password())) {
            throw new IllegalStateException("Password!");
        }
        return userData;
    }

    public User signUp(AuthRequest.SignUpRequest request) {
        //check username is exist
        User userData = userRepository.findByUsername(request.username());
        if(userData != null) {
            throw new IllegalStateException("Username is exist!");
        }

        User user = User.builder()
                .username(request.username())
                .password(request.password())
                .fullname(request.fullname())
                .avatar(request.avatar())
                .balance(request.balance())
                .build();

        return userRepository.save(user);
    }
}

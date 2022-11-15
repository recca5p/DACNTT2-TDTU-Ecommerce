package com.cntt2.user.service;

import com.cntt2.user.controller.UserRequest;
import com.cntt2.user.model.User;
import com.cntt2.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public record UserService(UserRepository userRepository) {

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getSingleUser(String userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new IllegalStateException("User ID: " + userId + "not found!")
        );
    }

    public User createUser(UserRequest request) {

        User user = User.builder()
                .username(request.username())
                .password(request.password())
                .fullname(request.fullname())
                .avatar(request.avatar())
                .balance(request.balance())
                .build();

        return userRepository.save(user);
    }

    public User updateUser(String userId, UserRequest request) {
        User userData = userRepository.findById(userId).orElseThrow(
                () -> new IllegalStateException("User ID: " + userId + "not found!")
        );

        userData.setUsername(request.username());
        userData.setPassword(request.password());
        userData.setFullname(request.fullname());
        userData.setBalance(request.balance());
        userData.setAvatar(request.avatar());
        return userRepository.save(userData);
    }

    public void deleteUser(String userId) {
        boolean isExists = userRepository.existsById(userId);
        if(!isExists) {
            throw new IllegalStateException(
                    "User ID: " + userId + "not found!"
            );
        }
        userRepository.deleteById(userId);
    }
}
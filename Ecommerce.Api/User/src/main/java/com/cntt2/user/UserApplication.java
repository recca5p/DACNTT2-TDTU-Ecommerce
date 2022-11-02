package com.cntt2.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
public class UserApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }

    @GetMapping
    public List<User> userController() {
        return List.of(
                new User(
                        1L,
                        "Nhat",
                        "nhat@gmail.com",
                        "bmn",
                        "12345",
                        "12345"
                ),
                new User(
                        2L,
                        "Phat",
                        "phat@gmail.com",
                        "votanphat",
                        "67890",
                        "67890"
                )
        );
    }
}

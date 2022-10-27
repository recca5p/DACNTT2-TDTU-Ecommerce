package com.example.CNTT2api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Cntt2ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(Cntt2ApiApplication.class, args);
	}

	@GetMapping
	public String hello() {
		return "Hello Dự án CNTT2";
	}
}

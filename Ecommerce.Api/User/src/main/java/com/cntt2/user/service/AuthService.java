package com.cntt2.user.service;

import com.cntt2.user.controller.AuthRequest;
import com.cntt2.user.dto.AuthResponse;
import com.cntt2.user.model.Role;
import com.cntt2.user.model.User;
import com.cntt2.user.repository.RoleRepository;
import com.cntt2.user.repository.UserRepository;
import com.cntt2.user.security.TokenManager;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private  final RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenManager tokenManager;

    public AuthResponse signIn(AuthRequest.SignInRequest request) {
        User userData = userRepository.findByUsername(request.username()).orElseThrow();
        if(userData == null) {
            throw new IllegalStateException("Username is not correct!");
        }
        if(!passwordEncoder.matches(request.password(), userData.getPassword())) {
            throw new IllegalStateException("Password is not correct!");
        }

        //generate token
        final String jwtToken = tokenManager.generateJwtToken(userData.getId());

        System.out.println(userData.getUsername());
        //generate data response
        AuthResponse response = new AuthResponse(userData);
        response.setToken(jwtToken);

        return response;
    }

    public AuthResponse signUp(AuthRequest.SignUpRequest request) {
        //check username is exist
//        Optional<User> userData = userRepository.findByUsername(request.username());
//        if(userData != null) {
//            throw new IllegalStateException("Username is exist!");
//        }

        List<Role> userRoles = setRoles(Arrays.asList("USER"));

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .fullname(request.fullname())
                .avatar(request.avatar())
                .roles(userRoles)
                .build();

        //save data in db
        User saveUser = userRepository.save(user);
        System.out.println(saveUser);


        //generate token
        final String jwtToken = tokenManager.generateJwtToken(user.getId());

        //generate data response
        AuthResponse response = new AuthResponse(user);
        response.setToken(jwtToken);

        return response;
    }

    public List<Role> setRoles(List<String> roleNames) {
        List<Role> roles = new ArrayList<>();
        for (String roleName: roleNames) {
            Role roleData = roleRepository.findByName(roleName);
            if(roleData != null) {
                roles.add(roleData);
            } else {
                Role newRole = Role.builder()
                        .name(roleName)
                        .build();
                roleRepository.save(newRole);
                roles.add(newRole);
            }
        }
        return roles;
    }
}

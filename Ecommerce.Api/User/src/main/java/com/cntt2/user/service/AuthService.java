package com.cntt2.user.service;

import com.cntt2.user.dto.AuthRequest;
import com.cntt2.user.dto.AuthResponse;
import com.cntt2.user.model.Role;
import com.cntt2.user.model.User;
import com.cntt2.user.repository.RoleRepository;
import com.cntt2.user.repository.UserRepository;
import com.cntt2.user.security.TokenManager;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
        List<Role> userRoles = setRoles(Arrays.asList("USER"));

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .fullname(request.fullname())
                .email(request.email())
                .phone(request.phone())
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

    public UserDetails checkAuth(String tokenHeader) {
        String userId = null;
        String token = null;

        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            token = tokenHeader.substring(7);
            try {
                userId = tokenManager.getUserIDFromToken(token);
            } catch (IllegalArgumentException e) {
                throw new IllegalStateException("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                throw new IllegalStateException("JWT Token has expired");
            }
        } else {
            throw new IllegalStateException("Bearer String not found in token");
        }

        if (null != userId) {
            User userData = userRepository.findById(userId).orElseThrow(
                    () -> new IllegalStateException("UserID not found!")
            );
            if (tokenManager.validateJwtToken(token) && userData != null) {
                return userData;
            }
        }

        return null;
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

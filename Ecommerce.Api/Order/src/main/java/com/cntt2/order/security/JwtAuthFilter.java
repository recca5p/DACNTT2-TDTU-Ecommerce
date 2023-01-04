package com.cntt2.order.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    RestTemplate restTemplate;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;

        if(authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println(authHeader);

        if(SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userData = isAuthTokenValid(authHeader);
            System.out.println(userData);
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userData, null, userData.getAuthorities());
            System.out.println(authToken);
//            request.setAttribute("userId",userId);
//            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//            System.out.println(authToken);
//            SecurityContextHolder.getContext().setAuthentication(authToken);

//            Authentication auth = authenticationManager.authenticate(authToken);
//            SecurityContext sc = SecurityContextHolder.getContext();
//            sc.setAuthentication(auth);

        }
        filterChain.doFilter(request, response);
    }

    private UserDetails isAuthTokenValid(String token){
        UserDetails userData = null;
        try {
            UserInfo userTest = webClientBuilder.build().get()
                    .uri("http://user/api/v1/auth/authenticate?token="+token)
                    .retrieve()
                    .bodyToMono(UserInfo.class)
                    .block();
            System.out.println(userTest);
//            userData = restTemplate.exchange(
//                    "http://localhost:8081/api/v1/auth/authenticate?token={token}",
//                    HttpMethod.GET,
//                    null, UserDetails.class, token).getBody();
//            System.out.println(userId.getBody());
        }
        catch(HttpClientErrorException ex){
            if (ex.getStatusCode()== HttpStatus.UNAUTHORIZED) {
                return null;
            }
            throw ex;
        }
        return userData;
    }
}

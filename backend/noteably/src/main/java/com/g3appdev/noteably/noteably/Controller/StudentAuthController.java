package com.g3appdev.noteably.Controller;

import com.g3appdev.noteably.Entity.StudentEntity;
import com.g3appdev.noteably.JWT.AuthenticationRequest;
import com.g3appdev.noteably.JWT.JwtUtil;
import com.g3appdev.noteably.Service.CustomUserDetailsService;
import com.g3appdev.noteably.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/studentauth")
public class StudentAuthController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    //naa nani siyay refresh token pakapin hahaha
    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody StudentEntity studentEntity) {
        StudentEntity registeredCustomer = studentService.registerStudent(studentEntity);
        if (registeredCustomer != null) {
            final UserDetails userDetails = customUserDetailsService.loadUserByUsername(registeredCustomer.getEmail());
            final String jwt = jwtUtil.generateToken(userDetails);
            final String refreshToken = jwtUtil.generateRefreshToken(userDetails);
            return ResponseEntity.ok(Map.of("token", jwt, "refreshToken", refreshToken));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed");
        }
    }
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAuthenticationToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        if (jwtUtil.validateToken(refreshToken)) {
            String username = jwtUtil.extractUsername(refreshToken);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
            String newToken = jwtUtil.generateToken(userDetails);
            return ResponseEntity.ok(Collections.singletonMap("token", newToken));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid refresh token");
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Missing or invalid Authorization header");
        }
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        if (jwtUtil.validateToken(token)) {
            return ResponseEntity.ok(Map.of("valid", true));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid or expired token");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        return ResponseEntity.ok(Map.of("token", jwt, "refreshToken", refreshToken));
    }

}

package com.eegproject.eegbackend.controller;

import java.util.Map;
import java.util.HashMap;


import com.eegproject.eegbackend.model.User;
import com.eegproject.eegbackend.repository.UserRepository;
import com.eegproject.eegbackend.utils.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // Validate required fields
            if (user.getUsername() == null || user.getEmail() == null || 
                user.getPassword() == null || user.getContact() == null || 
                user.getDob() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                   .body("All fields (username, email, password, contact, dob) are required.");
            }

            // Check if email already exists
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                   .body("Email is already registered.");
            }

            // Create new user with all fields
            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setEmail(user.getEmail());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setContact(user.getContact());
            newUser.setDob(user.getDob());

            // Save user
            User savedUser = userRepository.save(newUser);

            // Return success response with user ID
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("userId", savedUser.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                               .body("Error during registration: " + e.getMessage());
        }
    }

    // Login a user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
    Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
    if (userOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
    }

    User user = userOptional.get();
    if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
    }

    // Generate JWT token
    String token = jwtUtil.generateToken(user.getId());
    
    Map<String, String> response = new HashMap<>();
    response.put("token", token);
    response.put("userId", user.getId());
    
     return ResponseEntity.ok(response);
    
}

}

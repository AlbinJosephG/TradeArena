package com.tradearena.backend.controller;

import com.tradearena.backend.dto.UserProfileResponse;
import com.tradearena.backend.entity.User;
import com.tradearena.backend.repository.UserRepository;
import com.tradearena.backend.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfileResponse response = new UserProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        return ResponseEntity.ok(response);
    }
}

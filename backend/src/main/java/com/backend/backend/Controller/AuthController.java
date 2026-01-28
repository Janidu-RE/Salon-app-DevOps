package com.backend.backend.Controller;

import com.backend.backend.DTO.LoginRequest;
import com.backend.backend.DTO.SignupRequest;
import com.backend.backend.Services.UsersService;
import com.backend.backend.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsersService usersService;

    @PostMapping("/signup")
    public ResponseEntity<?> Signup(@RequestBody SignupRequest signupRequest) {
        Users user = usersService.RegisterUser(signupRequest);
        try {
            return ResponseEntity.ok("User registered succesfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginRequest loginRequest) {

        try {
            Users user = usersService.Login(loginRequest);
            return ResponseEntity.ok(Map.of(
                    "username", user.getUsername(),
                    "userId", user.get_id().toString(),
                    "role", user.getRole() != null ? user.getRole() : "USER"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}

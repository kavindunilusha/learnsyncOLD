package com.paf_grp.backend.controller.kavindu;

import com.paf_grp.backend.model.kavindu.User;
import com.paf_grp.backend.repository.kavindu.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ✅ Register new user
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("⚠️ Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        savedUser.setPassword(null); // do not return password
        return ResponseEntity.ok(savedUser);
    }

    // ✅ Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        User user = userRepository.findByUsername(loginData.getUsername());

        if (user == null) {
            return ResponseEntity.status(401).body("❌ Invalid username");
        }

        boolean passwordMatches = passwordEncoder.matches(loginData.getPassword(), user.getPassword());

        if (!passwordMatches) {
            return ResponseEntity.status(401).body("❌ Invalid password");
        }

        user.setPassword(null); // ✅ Hide password before returning
        return ResponseEntity.ok(user);
    }

    // ✅ Update user profile by ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setFirstName(updatedUser.getFirstName());
                    existingUser.setLastName(updatedUser.getLastName());
                    existingUser.setUsername(updatedUser.getUsername());
                    existingUser.setEmail(updatedUser.getEmail());

                    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
                        existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                    }

                    User savedUser = userRepository.save(existingUser);
                    savedUser.setPassword(null);
                    return ResponseEntity.ok(savedUser); // ✅ User object
                })
                .orElse(ResponseEntity.notFound().build());
        // ✅ String message allowed now
    }


}

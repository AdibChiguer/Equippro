package com.EquipPro.backend.controller;

import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.User;
import com.EquipPro.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        users.forEach(user -> user.setPassword(null));
        return new ResponseEntity<>(users, HttpStatus.FOUND);
    }
    @GetMapping("/{userCin}")
    public ResponseEntity<?> getUser(@PathVariable String userCin){
        try {
            User user = userService.getUser(userCin);
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }
    @DeleteMapping("/delete/{userCin}")
    public ResponseEntity<String> deleteUser(@PathVariable String userCin){
        try {
            userService.deleteUser(userCin);
            return ResponseEntity.ok("User deleted successfully");
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }
}

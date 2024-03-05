package com.EquipPro.backend.controller;

import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.Client;
import com.EquipPro.backend.model.User;
import com.EquipPro.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/all")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        users.forEach(user -> user.setPassword(null));
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/{userCin}")
//    @PreAuthorize("hasRole('admin')")
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

    @DeleteMapping("/delete/{email}")
//    @PreAuthorize("hasRole('admin') or hasRole('client') and #email == principal.username or hasRole('technician') and #email == principal.username")
    public ResponseEntity<String> deleteUser(@PathVariable String email){
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }

    @GetMapping("/clients/all")
    public ResponseEntity<List<Client>> getAllClient(){
        List<Client> clients = userService.getAllClient();
        clients.forEach(user -> user.setPassword(null));
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }
}

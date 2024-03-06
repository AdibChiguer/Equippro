package com.EquipPro.backend.controller;

import com.EquipPro.backend.exception.UserAlreadyExistsException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.Admin;
import com.EquipPro.backend.model.Client;
import com.EquipPro.backend.model.Technician;
import com.EquipPro.backend.model.User;
import com.EquipPro.backend.request.LoginRequest;
import com.EquipPro.backend.response.JwtResponse;
import com.EquipPro.backend.security.jwt.JwtUtils;
import com.EquipPro.backend.security.user.AppUserDetails;
import com.EquipPro.backend.service.UserServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserServiceImp userServiceImp;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @PostMapping("/register/client")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> registerUser(@RequestBody Client client){
        try{
            userServiceImp.registerClient(client);
            return ResponseEntity.ok("Registration of client successful!");
        } catch (UserAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/register/technician")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> registerUser(@RequestBody Technician technician){
        try{
            userServiceImp.registerTechnician(technician);
            return ResponseEntity.ok("Registration of technician successful");
        } catch (UserAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin){
        try{
            userServiceImp.registerAdmin(admin);
            return ResponseEntity.ok("Registration of admin successful");
        } catch (UserAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("/update/client")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> updateClient(@RequestBody Client client){
        try {
            userServiceImp.updateClient(client);
            return ResponseEntity.ok("Client with the cin : "+ client.getCin() + " successfully updated");
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/update/technician")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> updateTechnician(@RequestBody Technician technician){
        try {
            userServiceImp.updateTechnician(technician);
            return ResponseEntity.ok("Technician with the cin : "+ technician.getCin() + " successfully updated");
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request){
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
        AppUserDetails userDetails = (AppUserDetails) authentication.getPrincipal();
        List<String> role = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).toList();
        return ResponseEntity.ok(new JwtResponse(
                userDetails.getCin(),
                userDetails.getEmail(),
                jwt,
                role
        ));
    }
}

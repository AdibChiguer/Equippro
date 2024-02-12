package com.EquipPro.backend.controller;

import com.EquipPro.backend.exception.RoleAlreadyExistException;
import com.EquipPro.backend.model.Role;
import com.EquipPro.backend.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/all")
    public ResponseEntity<List<Role>> getAllRoles(){
        return new ResponseEntity<>(roleService.getRoles(), HttpStatus.FOUND);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRole(@RequestBody Role role){
        try {
            return ResponseEntity.ok(roleService.createRole(role));
        } catch (RoleAlreadyExistException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{roleId}")
    public ResponseEntity<String> deleteRole(@PathVariable Long roleId){
        try {
            roleService.deleteRole(roleId);
            return ResponseEntity.ok("the role was deleted successfully");
        } catch (RoleNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("the role with the id :" + roleId+ " not found");
        }
    }
}

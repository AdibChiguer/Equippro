package com.EquipPro.backend.service;

import com.EquipPro.backend.exception.RoleAlreadyExistException;
import com.EquipPro.backend.model.Role;
import com.EquipPro.backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleServiceImp implements RoleService{
    private final RoleRepository roleRepository;
    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role role) {
        String roleName = role.getName().toLowerCase();
        if (roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistException(roleName + " role already exists");
        }
        role.setName(roleName);
        return roleRepository.save(role);
    }


    @Override
    public void deleteRole(Long id) throws RoleNotFoundException {
        Optional<Role> role = roleRepository.findById(id);
        if (role.isPresent()){
            roleRepository.deleteById(id);
        } else {
            throw new RoleNotFoundException("the role not found");
        }
    }
}

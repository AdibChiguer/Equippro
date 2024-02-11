package com.EquipPro.backend.service;

import com.EquipPro.backend.model.Role;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

public interface RoleService {
    List<Role> getRoles();
    Role createRole(Role role);
    void deleteRole(Long id) throws RoleNotFoundException;
}

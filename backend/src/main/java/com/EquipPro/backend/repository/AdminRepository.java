package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin , String> {
    Boolean existsByEmail(String email);

    Optional<Admin> findByEmail(String email);
}

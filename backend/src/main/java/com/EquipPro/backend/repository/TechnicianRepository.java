package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.Technician;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechnicianRepository extends JpaRepository<Technician, String> {
    boolean existsByEmail(String email);
    Optional<Technician> findByEmail(String email);
}

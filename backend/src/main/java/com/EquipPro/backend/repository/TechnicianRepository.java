package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.Technician;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnicianRepository extends JpaRepository<Technician, String> {
    boolean existsByEmail(String email);
}

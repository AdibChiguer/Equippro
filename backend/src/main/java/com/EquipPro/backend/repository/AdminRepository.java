package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin , String> {
}

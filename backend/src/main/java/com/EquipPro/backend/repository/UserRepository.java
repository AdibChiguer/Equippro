package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}

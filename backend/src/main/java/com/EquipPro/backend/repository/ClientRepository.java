package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, String> {
    boolean existsByEmail(String email);
}

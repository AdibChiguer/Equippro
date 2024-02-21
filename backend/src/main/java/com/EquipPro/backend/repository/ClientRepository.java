package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, String> {
    boolean existsByEmail(String email);

    Optional<Client> findByEmail(String email);
}

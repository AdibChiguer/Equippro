package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.EquipmentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EquipmentRequestRepository extends JpaRepository<EquipmentRequest, Long> {

    @Query("SELECT r FROM EquipmentRequest r WHERE r.client.cin = :cin")
    List<EquipmentRequest> getOwnedRequests(String cin);
}

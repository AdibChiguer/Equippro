package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.EquipmentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EquipmentInfoRepository extends JpaRepository<EquipmentInfo, String> {
    List<EquipmentInfo> findEquipmentInfoByAvailable(boolean available);

    @Query("SELECT e FROM EquipmentInfo e WHERE e.owner IS NULL")
    List<EquipmentInfo> getNotUsedEquipments();
}

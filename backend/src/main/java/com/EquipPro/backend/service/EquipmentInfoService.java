package com.EquipPro.backend.service;

import com.EquipPro.backend.model.EquipmentInfo;

import java.util.List;
import java.util.Optional;

public interface EquipmentInfoService {
    List<EquipmentInfo> getAllEquipments();
    List<EquipmentInfo> getOwnedEquipments(String email);
    List<EquipmentInfo> getFixedEquipments(String email);
    List<EquipmentInfo> getFixingEquipments(String email);
    EquipmentInfo createEquipment(EquipmentInfo equipment);
    List<EquipmentInfo> getAvailableEquipments();
    List<EquipmentInfo> getNotUsedEquipments();
    EquipmentInfo getEquipment(String ref);
    Optional<EquipmentInfo> getOwnedEquipmentInfo(String ref , String email);
    void deleteEquipment(String ref);
    void assignEquipmentToClient(String ref, String cin);
    void removeEquipmentFromClient(String ref, String cin);
    EquipmentInfo equipmentIssueRequest(String ref);
    void updateEquipmentInfo(EquipmentInfo equipmentInfo);
}

package com.EquipPro.backend.service;

import com.EquipPro.backend.model.EquipmentInfo;

import java.util.List;

public interface EquipmentInfoService {
    List<EquipmentInfo> getAllEquipments();
    List<EquipmentInfo> getOwnedEquipments(String cin);
    List<EquipmentInfo> getFixedEquipments(String cin);
    List<EquipmentInfo> getFixingEquipments(String cin);
    EquipmentInfo createEquipment(EquipmentInfo equipment);
    List<EquipmentInfo> getAvailableEquipments();
    List<EquipmentInfo> getNotUsedEquipments();
    EquipmentInfo getEquipment(String ref);
    void deleteEquipment(String ref);
    void assignEquipmentToClient(String ref, String cin);
    void assignEquipmentToTechnician(String ref, String cin);
    void removeEquipmentFromClient(String ref, String cin);
    void removeEquipmentFromTechnician(String ref, String cin);
    EquipmentInfo equipmentIssueRequest(String ref);
}

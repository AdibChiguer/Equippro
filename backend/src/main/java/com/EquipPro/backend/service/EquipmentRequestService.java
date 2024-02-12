package com.EquipPro.backend.service;

import com.EquipPro.backend.model.EquipmentRequest;

import java.util.List;

public interface EquipmentRequestService {
    List<EquipmentRequest> getAllEquipmentRequest();
    EquipmentRequest getEquipmentRequest(Long equipmentRequestId);
    EquipmentRequest createEquipmentRequest(EquipmentRequest equipmentRequest);
    void deleteEquipmentRequest(Long equipmentRequestId);

    List<EquipmentRequest> getOwnedRequests(String cin);
}

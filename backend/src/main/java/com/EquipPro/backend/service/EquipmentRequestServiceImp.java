package com.EquipPro.backend.service;

import com.EquipPro.backend.exception.EquipmentNotFoundException;
import com.EquipPro.backend.exception.EquipmentRequestNotFoundException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.Client;
import com.EquipPro.backend.model.EquipmentInfo;
import com.EquipPro.backend.model.EquipmentRequest;
import com.EquipPro.backend.repository.ClientRepository;
import com.EquipPro.backend.repository.EquipmentInfoRepository;
import com.EquipPro.backend.repository.EquipmentRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EquipmentRequestServiceImp implements EquipmentRequestService{
    private final EquipmentRequestRepository equipmentRequestRepository;
    private final ClientRepository clientRepository;
    private final EquipmentInfoRepository equipmentInfoRepository;

    @Override
    public List<EquipmentRequest> getAllEquipmentRequest() {
        return equipmentRequestRepository.findAll();
    }

    @Override
    public EquipmentRequest getEquipmentRequest(Long equipmentRequestId) {
        return equipmentRequestRepository.findById(equipmentRequestId)
                .orElseThrow(()-> new EquipmentRequestNotFoundException("The equipment request not found!"));
    }

    @Override
    public EquipmentRequest createEquipmentRequest(EquipmentRequest equipmentRequest) {
        Optional<Client> client = clientRepository.findById(equipmentRequest.getClient().getCin());
        Optional<EquipmentInfo> equipment = equipmentInfoRepository.findById(equipmentRequest.getEquipmentInfo().getRef());
        if (client.isEmpty()){
            throw new UserNotFoundException("the user with the cin : "+equipmentRequest.getClient().getCin()+" not found");
        } else if (equipment.isEmpty()) {
            throw new EquipmentRequestNotFoundException("the equipment with the reference : "+equipmentRequest.getEquipmentInfo().getRef()+" not found");
        } else {
            equipmentRequest.setRequestDate(LocalDate.now());
            equipmentRequest.setClient(client.get());
            equipmentRequest.setEquipmentInfo(equipment.get());
            return equipmentRequestRepository.save(equipmentRequest);
        }
    }

    @Override
    public void deleteEquipmentRequest(Long equipmentRequestId) {
        Optional<EquipmentRequest> equipmentRequest = equipmentRequestRepository.findById(equipmentRequestId);
        if (equipmentRequest.isEmpty()){
            throw new EquipmentRequestNotFoundException("the equipment request with the id : "+ equipmentRequestId + " not found");
        } else {
            equipmentRequestRepository.deleteById(equipmentRequestId);
        }
    }

    @Override
    public List<EquipmentRequest> getOwnedRequests(String cin) {
        Optional<Client> client = clientRepository.findById(cin);
        if (client.isEmpty()){
            throw new UserNotFoundException("the client not found");
        } else {
            return equipmentRequestRepository.getOwnedRequests(cin);
        }
    }
}

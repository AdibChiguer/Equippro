package com.EquipPro.backend.service;

import com.EquipPro.backend.exception.EquimpmentAlreadyExistsException;
import com.EquipPro.backend.exception.EquipmentNotFoundException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.Client;
import com.EquipPro.backend.model.EquipmentInfo;
import com.EquipPro.backend.model.Technician;
import com.EquipPro.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EquipmentInfoServiceImp implements EquipmentInfoService{
    private final EquipmentInfoRepository equipmentInfoRepository;
    private final UserRepository userRepository;
    private final TechnicianRepository technicianRepository;
    private final ClientRepository clientRepository;
    private final TicketRepository ticketRepository;

    @Override
    public List<EquipmentInfo> getAllEquipments() {
        return equipmentInfoRepository.findAll();
    }

    @Override
    public List<EquipmentInfo> getOwnedEquipments(String cin) {
        Optional<Client> userOptional = clientRepository.findById(cin);
        if (userOptional.isPresent()){
            return userOptional.get().getEquipment();
        } else {
            throw new UserNotFoundException("the client not found");
        }
    }

    @Override
    public List<EquipmentInfo> getFixedEquipments(String cin) {
        Optional<Technician> technician = technicianRepository.findById(cin);
        if (technician.isPresent()){
            return ticketRepository.getFixedEquipments(cin);
        } else {
            throw new UserNotFoundException("the technician with the cin : " + cin + " not found");
        }
    }

    @Override
    public List<EquipmentInfo> getFixingEquipments(String cin) {
        Optional<Technician> technician = technicianRepository.findById(cin);
        if (technician.isPresent()){
            return ticketRepository.getFixingEquipments(cin);
        } else {
            throw new UserNotFoundException("the technician with the cin : " + cin + " not found");
        }
    }

    @Override
    public EquipmentInfo createEquipment(EquipmentInfo equipment) {
        Optional<EquipmentInfo> equipmentInfo = equipmentInfoRepository.findById(equipment.getRef());
        if (equipmentInfo.isPresent()){
            throw new EquimpmentAlreadyExistsException("the equipment with the ref : "+ equipment.getRef() + " already exists");
        }
        equipment.setCreationDate(LocalDate.now());
        equipment.setAvailable(true);
        equipment.setOwner(null);
        return equipmentInfoRepository.save(equipment);
    }

    @Override
    public List<EquipmentInfo> getAvailableEquipments() {
        return equipmentInfoRepository.findEquipmentInfoByAvailable(true);
    }

    @Override
    public List<EquipmentInfo> getNotUsedEquipments() {
        return equipmentInfoRepository.getNotUsedEquipments();
    }

    @Override
    public EquipmentInfo getEquipment(String ref) {
        Optional<EquipmentInfo> equipmentInfo = equipmentInfoRepository.findById(ref);
        if (equipmentInfo.isPresent()){
            return equipmentInfo.get();
        } else {
            throw new EquipmentNotFoundException("the equipment with the reference : "+ ref + " not found");
        }
    }

    @Override
    public void deleteEquipment(String ref) {
        Optional<EquipmentInfo> equipmentInfo = equipmentInfoRepository.findById(ref);
        if (equipmentInfo.isPresent()){
            equipmentInfoRepository.deleteById(ref);
        } else {
            throw new EquipmentNotFoundException("the equipment with the reference : "+ ref + " not found");
        }
    }

    @Override
    public void assignEquipmentToClient(String ref, String cin) {
        Optional<EquipmentInfo> equipmentInfo = equipmentInfoRepository.findById(ref);
        Optional<Client> client = clientRepository.findById(cin);
        if (client.isEmpty()){
            throw new UserNotFoundException("the client with the cin : " + cin + " not found");
        } else if (equipmentInfo.isEmpty()) {
            throw new EquipmentNotFoundException("the equipment with the reference : "+ ref + " not found");
        } else if (client.get().getEquipment().contains(equipmentInfo.get())) {
            throw new EquimpmentAlreadyExistsException(equipmentInfo.get().getRef()+ " is already assigned to the client with cin : "+ client.get().getCin());
        } else {
            client.get().getEquipment().add(equipmentInfo.get());
            equipmentInfo.get().setOwner(client.get());
            clientRepository.save(client.get());
            equipmentInfoRepository.save(equipmentInfo.get());
        }
    }

    @Override
    public void removeEquipmentFromClient(String ref, String cin) {
        Optional<EquipmentInfo> equipmentInfo = equipmentInfoRepository.findById(ref);
        Optional<Client> client = clientRepository.findById(cin);
        if (client.isEmpty()){
            throw new UserNotFoundException("the client with the cin : " + cin + " not found");
        } else if (equipmentInfo.isEmpty()) {
            throw new EquipmentNotFoundException("the equipment with the reference : "+ ref + " not found");
        } else if (!client.get().getEquipment().contains(equipmentInfo.get())) {
            throw new EquimpmentAlreadyExistsException(equipmentInfo.get().getRef()+ " is already removed from the client with cin : "+ client.get().getCin());
        } else {
            client.get().getEquipment().remove(equipmentInfo.get());
            equipmentInfo.get().setOwner(null);
            clientRepository.save(client.get());
            equipmentInfoRepository.save(equipmentInfo.get());
        }
    }

    @Override
    public EquipmentInfo equipmentIssueRequest(String ref) {
        return null;
    }

    @Override
    public void updateEquipmentInfo(EquipmentInfo equipmentInfo) {
        Optional<EquipmentInfo> equipment = equipmentInfoRepository.findById(equipmentInfo.getRef());
        if (equipment.isEmpty()){
            throw new EquipmentNotFoundException("the equipment with the ref : " + equipmentInfo.getRef() + " not found");
        }
        equipment.get().setType(equipmentInfo.getType());
        equipment.get().setAvailable(equipmentInfo.getAvailable());
        if (equipmentInfo.getOwner() != null){
            equipment.get().setOwner(equipmentInfo.getOwner());
        }
        equipmentInfoRepository.save(equipment.get());
    }
}

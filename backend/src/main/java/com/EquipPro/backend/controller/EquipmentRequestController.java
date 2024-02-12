package com.EquipPro.backend.controller;

import com.EquipPro.backend.exception.EquipmentRequestNotFoundException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.EquipmentRequest;
import com.EquipPro.backend.service.EquipmentRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/requests")
public class EquipmentRequestController {
    private final EquipmentRequestService equipmentRequestService;

    @GetMapping("/all")
    public ResponseEntity<List<EquipmentRequest>> getAllRequests(){
        return ResponseEntity.ok(equipmentRequestService.getAllEquipmentRequest());
    }

    @GetMapping("/request/{requestId}")
    public ResponseEntity<?> getEquipmentRequest(@PathVariable Long requestId){
        try {
            return ResponseEntity.ok(equipmentRequestService.getEquipmentRequest(requestId));
        } catch (EquipmentRequestNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the equipment request");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createEquipmentRequest(@RequestBody EquipmentRequest equipmentRequest){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(equipmentRequestService.createEquipmentRequest(equipmentRequest));
        } catch (EquipmentRequestNotFoundException | UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating the equipment request");
        }
    }

    @DeleteMapping("/delete/{requestId}")
    public ResponseEntity<?> deleteEquipmentRequest(@PathVariable Long requestId){
        try {
            equipmentRequestService.deleteEquipmentRequest(requestId);
            return ResponseEntity.ok("the equipment request deleted successfully");
        } catch (EquipmentRequestNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting the equipment request");
        }
    }

    @GetMapping("/owned/{cin}")
    public ResponseEntity<?> getOwnedRequests(@PathVariable String cin){
        try {
            return ResponseEntity.ok(equipmentRequestService.getOwnedRequests(cin));
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting the equipment request");
        }
    }
}

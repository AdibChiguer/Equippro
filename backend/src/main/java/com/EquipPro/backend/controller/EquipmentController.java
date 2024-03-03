package com.EquipPro.backend.controller;

import com.EquipPro.backend.exception.EquimpmentAlreadyExistsException;
import com.EquipPro.backend.exception.EquipmentNotFoundException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.EquipmentInfo;
import com.EquipPro.backend.model.User;
import com.EquipPro.backend.repository.UserRepository;
import com.EquipPro.backend.service.EquipmentInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/equipments")
public class EquipmentController {
    private final EquipmentInfoService equipmentInfoService;
    @GetMapping("/all")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<EquipmentInfo>> getAllEquipment(){
        return new ResponseEntity<>(equipmentInfoService.getAllEquipments(), HttpStatus.OK);
    }

    @GetMapping("/owned/{email}")
//    @PreAuthorize("hasRole('admin') or hasRole('client') and #email == principal.username")
    public ResponseEntity<?> getOwnedEquipment(@PathVariable String email){
        try {
            return new ResponseEntity<>(equipmentInfoService.getOwnedEquipments(email), HttpStatus.OK);
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the equipments");
        }
    }

    @GetMapping("/fixed/{email}")
//    @PreAuthorize("hasRole('admin') or hasRole('technician') and #email == principal.username")
    public ResponseEntity<?> getFixedEquipment(@PathVariable String email){
        try {
            return new ResponseEntity<>(equipmentInfoService.getFixedEquipments(email), HttpStatus.OK);
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the equipments");
        }
    }

    @GetMapping("/fixing/{email}")
//    @PreAuthorize("hasRole('admin') or hasRole('technician') and #email == principal.username")
    public ResponseEntity<?> getFixingEquipment(@PathVariable String email){
        try {
            return new ResponseEntity<>(equipmentInfoService.getFixingEquipments(email), HttpStatus.OK);
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the equipments");
        }
    }

    @PostMapping("/create")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> createEquipment(@RequestBody EquipmentInfo reqEquipment){
        try {
            EquipmentInfo equipmentInfo = equipmentInfoService.createEquipment(reqEquipment);
            return ResponseEntity.ok(equipmentInfo);
        } catch (EquimpmentAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/available")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<EquipmentInfo>> getAvailableEquipments(){
        return ResponseEntity.ok(equipmentInfoService.getAvailableEquipments());
    }

    @GetMapping("/not-used")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<EquipmentInfo>> getNotUsedEquipments(){
        return ResponseEntity.ok(equipmentInfoService.getNotUsedEquipments());
    }

    @GetMapping("/equipment/{ref}")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> getEquipment(@PathVariable String ref){
        try {
            return ResponseEntity.ok(equipmentInfoService.getEquipment(ref));
        } catch (EquipmentNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the equipment");
        }
    }

    @DeleteMapping("/delete/equipment/{ref}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> deleteEquipment(@PathVariable String ref){
        try{
            equipmentInfoService.deleteEquipment(ref);
            return ResponseEntity.status(HttpStatus.OK).body("Equipment deleted successfully");
        } catch (EquipmentNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting the equipment");
        }
    }

    @PostMapping("/assign/client")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<String> assignEquipmentToClient(@RequestParam("cin") String cin , @RequestParam("ref") String ref){
        try {
            equipmentInfoService.assignEquipmentToClient(ref , cin);
            return ResponseEntity.ok("The equipment assigned successfully");
        } catch (UserNotFoundException | EquipmentNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (EquimpmentAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning the equipment to the user");
        }
    }

    @PostMapping("/remove/client")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<String> removeEquipmentFromClient(@RequestParam("cin") String cin , @RequestParam("ref") String ref){
        try {
            equipmentInfoService.removeEquipmentFromClient(ref, cin);
            return ResponseEntity.ok("The equipment removed from the client successfully");
        } catch (UserNotFoundException | EquipmentNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing equipment from the user");
        }
    }

    @PutMapping("/update")
//    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<?> updateEquipmentInfo(@RequestBody EquipmentInfo equipmentInfo){
        try {
            equipmentInfoService.updateEquipmentInfo(equipmentInfo);
            return ResponseEntity.ok("Equipment updated successfully");
        }catch (EquipmentNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Equipment not found");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error on the server during the update of the equipment");
        }
    }
}

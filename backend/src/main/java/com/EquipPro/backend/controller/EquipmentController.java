package com.EquipPro.backend.controller;

import com.EquipPro.backend.exception.EquimpmentAlreadyExistsException;
import com.EquipPro.backend.exception.EquipmentNotFoundException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.EquipmentInfo;
import com.EquipPro.backend.service.EquipmentInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/equipments")
public class EquipmentController {
    private final EquipmentInfoService equipmentInfoService;

    @GetMapping("/all")
    public ResponseEntity<List<EquipmentInfo>> getAllEquipment(){
        return new ResponseEntity<>(equipmentInfoService.getAllEquipments(), HttpStatus.FOUND);
    }

    @GetMapping("/owned/{cin}")
    public ResponseEntity<?> getOwnedEquipment(@PathVariable String cin){
        try {
            return new ResponseEntity<>(equipmentInfoService.getOwnedEquipments(cin), HttpStatus.FOUND);
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the equipments");
        }
    }

    @GetMapping("/fixed/{technicianCin}")
    public ResponseEntity<?> getFixedEquipment(@PathVariable String technicianCin){
        try {
            return new ResponseEntity<>(equipmentInfoService.getFixedEquipments(technicianCin), HttpStatus.FOUND);
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the equipments");
        }
    }

    @GetMapping("/fixing/{technicianCin}")
    public ResponseEntity<?> getFixingEquipment(@PathVariable String technicianCin){
        try {
            return new ResponseEntity<>(equipmentInfoService.getFixingEquipments(technicianCin), HttpStatus.FOUND);
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the equipments");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<EquipmentInfo> createEquipment(@RequestBody EquipmentInfo reqEquipment){
        EquipmentInfo equipmentInfo = equipmentInfoService.createEquipment(reqEquipment);
        return ResponseEntity.ok(equipmentInfo);
    }

    @GetMapping("/available")
    public ResponseEntity<List<EquipmentInfo>> getAvailableEquipments(){
        return ResponseEntity.ok(equipmentInfoService.getAvailableEquipments());
    }

    @GetMapping("/not-used")
    public ResponseEntity<List<EquipmentInfo>> getNotUsedEquipments(){
        return ResponseEntity.ok(equipmentInfoService.getNotUsedEquipments());
    }

    @GetMapping("/equipment/{ref}")
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

    @PostMapping("/assign/technician")
    public ResponseEntity<String> assignEquipmentToTechnician(@RequestParam("cin") String cin , @RequestParam("ref") String ref){
        try {
            equipmentInfoService.assignEquipmentToTechnician(ref , cin);
            return ResponseEntity.ok("The equipment assigned successfully");
        } catch (UserNotFoundException | EquipmentNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (EquimpmentAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning the equipment to the user");
        }
    }

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

    public ResponseEntity<String> removeEquipmentFromTechnician(@RequestParam("cin") String cin , @RequestParam("ref") String ref){
        try {
            equipmentInfoService.removeEquipmentFromTechnician(ref, cin);
            return ResponseEntity.ok("The equipment removed from the technician successfully");
        } catch (UserNotFoundException | EquipmentNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing equipment from the user");
        }
    }
}

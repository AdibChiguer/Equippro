package com.EquipPro.backend.controller;

import com.EquipPro.backend.exception.EquipmentNotFoundException;
import com.EquipPro.backend.exception.TicketNotFoundException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.Ticket;
import com.EquipPro.backend.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<List<Ticket>> getAllTickets(){
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @GetMapping("/ticket/{ticketId}")
    public ResponseEntity<?> getTicket(@PathVariable Long ticketId){
        try {
            return ResponseEntity.ok(ticketService.getTicket(ticketId));
        } catch (TicketNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the ticket");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTicket(@RequestBody Ticket ticket){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.createTicket(ticket));
        } catch (EquipmentNotFoundException | UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/close/{ticketId}")
    public ResponseEntity<?> closeTicket(@PathVariable Long ticketId){
        try {
            ticketService.closeTicket(ticketId);
            return ResponseEntity.ok("the ticket closed successfully");
        } catch (TicketNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error closing the ticket");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTicket(@RequestBody Ticket ticket){
        try {
            ticketService.updateTicket(ticket);
            return ResponseEntity.ok("the ticket updated successfully");
        } catch (TicketNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("the ticket not found");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during the update of the ticket");
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getTicketStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("closed", ticketService.getClosedTickets());
        statistics.put("underway", ticketService.getUnderwayTickets());
        statistics.put("waiting", ticketService.getWaitTickets());

        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/owned-tickets/{email}")
    public ResponseEntity<?> getOwnedTickets(@PathVariable String email){
        try{
            return ResponseEntity.ok(ticketService.getOwnedTickets(email));
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

package com.EquipPro.backend.controller;

import com.EquipPro.backend.exception.EquipmentNotFoundException;
import com.EquipPro.backend.exception.TicketNotFoundException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.Ticket;
import com.EquipPro.backend.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {
    private final TicketService ticketService;

    @GetMapping("/all")
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating the ticket");
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
}

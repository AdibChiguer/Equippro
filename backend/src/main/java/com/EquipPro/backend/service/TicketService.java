package com.EquipPro.backend.service;

import com.EquipPro.backend.model.Ticket;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface TicketService {
    List<Ticket> getAllTickets();
    Ticket getTicket(Long id);
    Ticket createTicket(Ticket ticket);
    void closeTicket(Long id);
    Ticket updateTicket(Ticket ticket);
    List<Ticket> getClosedTickets();
    List<Ticket> getUnderwayTickets();
    List<Ticket> getWaitTickets();
    List<Ticket> getOwnedTickets(String TechnicianEmail);
    List<Ticket> getOwnedTicketsClient(String clientEmail);
}

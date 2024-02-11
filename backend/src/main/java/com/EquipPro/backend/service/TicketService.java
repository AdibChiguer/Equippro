package com.EquipPro.backend.service;

import com.EquipPro.backend.model.Ticket;

import java.util.List;

public interface TicketService {
    List<Ticket> getAllTickets();
    Ticket getTicket(Long id);
    Ticket createTicket(Ticket ticket);
    void closeTicket(Long id);
}

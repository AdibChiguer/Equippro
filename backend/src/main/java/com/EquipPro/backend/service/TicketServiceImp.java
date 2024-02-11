package com.EquipPro.backend.service;

import com.EquipPro.backend.exception.EquipmentNotFoundException;
import com.EquipPro.backend.exception.TicketNotFoundException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.EquipmentInfo;
import com.EquipPro.backend.model.Technician;
import com.EquipPro.backend.model.Ticket;
import com.EquipPro.backend.repository.EquipmentInfoRepository;
import com.EquipPro.backend.repository.TechnicianRepository;
import com.EquipPro.backend.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketServiceImp implements TicketService{
    private final TicketRepository ticketRepository;
    private final EquipmentInfoRepository equipmentInfoRepository;
    private final TechnicianRepository technicianRepository;

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Override
    public Ticket getTicket(Long id) {
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isEmpty()){
            throw new TicketNotFoundException("the ticket with the id : " +id+ " not found");
        }
        return ticket.get();
    }

    @Override
    public Ticket createTicket(Ticket ticket) {
        Optional<EquipmentInfo> equipment = equipmentInfoRepository.findById(ticket.getEquipment().getRef());
        Optional<Technician> technician = technicianRepository.findById(ticket.getTechnician().getCin());
        if (equipment.isEmpty()){
            throw new EquipmentNotFoundException("the equipment with the reference : "+ ticket.getEquipment().getRef() + " not found");
        } else if (technician.isEmpty()) {
            throw new UserNotFoundException("the technician with the cin : " +ticket.getTechnician().getCin()+ " not found");
        } else {
            ticket.setStatus("underway");
            ticket.setOpenDate(LocalDate.now());
            ticket.setEquipment(equipment.get());
            ticket.setTechnician(technician.get());
            return ticketRepository.save(ticket);
        }
    }

    @Override
    public void closeTicket(Long id) {
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if (ticket.isEmpty()){
            throw new TicketNotFoundException("the ticket with the id : "+ id+ " not found");
        } else {
            ticket.get().setCloseDate(LocalDate.now());
            ticket.get().setStatus("closed");
            ticketRepository.save(ticket.get());
        }
    }
}

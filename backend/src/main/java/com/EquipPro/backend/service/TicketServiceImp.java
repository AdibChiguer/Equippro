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
import com.EquipPro.backend.template.EmailTemplate;
import jakarta.validation.constraints.Email;
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
    private final EmailService emailService;

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
            EmailTemplate emailTemplate = new EmailTemplate();
            // send email to client
            emailTemplate.setClientRecievedTicketMessage(equipment.get().getRef(),
                    equipment.get().getOwner().getNom(),
                    technician.get().getNom());
            String clientSubject = emailTemplate.getClientRecievedTicketMessage();
            String confirmationToUser = emailService.sendMail(equipment.get().getOwner().getEmail(),
                    "notification" ,
                    clientSubject );
            System.out.println("############### client :"+confirmationToUser);
            // send email to technician
            emailTemplate.setTechnicianRecievedTicketMessage(equipment.get().getRef(),
                    technician.get().getNom());
            String technicianSubject = emailTemplate.getTechnicianRecievedTicketMessage();
            String confirmationToTechnician = emailService.sendMail(technician.get().getEmail(),
                    "notification" ,
                    technicianSubject );
            System.out.println("############### technician :"+confirmationToUser);
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
            EmailTemplate emailTemplate = new EmailTemplate();
            // send email to client
            emailTemplate.setClientEquipmentFixed(ticket.get().getEquipment().getRef(),
                    ticket.get().getEquipment().getOwner().getNom());
            String clientSubject = emailTemplate.getClientEquipmentFixed();
            emailService.sendMail(ticket.get().getEquipment().getOwner().getEmail(),
                    "notification" ,
                    clientSubject );
            ticketRepository.save(ticket.get());
        }
    }

    @Override
    public Ticket updateTicket(Ticket ticket) {
        Optional<Ticket> t = ticketRepository.findById(ticket.getId());
        if (t.isEmpty()){
            throw new TicketNotFoundException("the ticket not found");
        }
        t.get().setComment(ticket.getComment());
        t.get().setTask(ticket.getTask());
        if (ticket.getTechnician() != null){
            t.get().setTechnician(ticket.getTechnician());
        }
        return ticketRepository.save(t.get());
    }
}

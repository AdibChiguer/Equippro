package com.EquipPro.backend.repository;

import com.EquipPro.backend.model.EquipmentInfo;
import com.EquipPro.backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query("SELECT t.equipment FROM Ticket t WHERE t.technician.cin = :cin AND t.status = 'closed'")
    List<EquipmentInfo> getFixedEquipments(@Param("cin") String cin);
    @Query("SELECT t.equipment FROM Ticket t WHERE t.technician.cin = :cin AND t.status = 'underway'")
    List<EquipmentInfo> getFixingEquipments(@Param("cin") String cin);

}

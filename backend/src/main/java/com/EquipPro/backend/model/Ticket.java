package com.EquipPro.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter @Setter
public class Ticket {
    @Id
    private Long id;
    private LocalDate openDate;
    private LocalDate closeDate;
    private String status;
    private String comment;
    private String task;
    @ManyToOne
    private EquipmentInfo equipment;
    @ManyToOne
    private Technician technician;
}

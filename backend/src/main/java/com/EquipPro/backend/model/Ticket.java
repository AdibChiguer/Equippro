package com.EquipPro.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter @Setter
public class Ticket {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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

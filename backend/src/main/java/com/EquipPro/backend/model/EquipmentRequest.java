package com.EquipPro.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter @Setter
public class EquipmentRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reqId;
    private LocalDate requestDate;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private EquipmentInfo equipmentInfo;
}

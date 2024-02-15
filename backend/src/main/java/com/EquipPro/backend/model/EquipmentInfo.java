package com.EquipPro.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class EquipmentInfo {
    @Id
    private String ref;
    private String type;
    private LocalDate creationDate;
    private Boolean available;
    @JsonIgnore
    @OneToMany(mappedBy = "equipment")
    private List<Ticket> ticket = new ArrayList<>();
    @JsonIgnore
    @ManyToOne
    private Client owner;
}

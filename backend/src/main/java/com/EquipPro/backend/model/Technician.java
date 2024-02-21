package com.EquipPro.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Technician extends User{
    private String specialite;
    @OneToMany(mappedBy = "technician")
    @JsonIgnore
    private List<Ticket> ticket = new ArrayList<>();
}

package com.EquipPro.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Client extends User{
    @JsonIgnore
    @OneToMany(mappedBy = "client" , fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<EquipmentRequest> requestedEquipments = new ArrayList<>();
    @OneToMany(mappedBy = "owner")
    private List<EquipmentInfo> equipment = new ArrayList<>();
}
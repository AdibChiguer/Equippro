package com.EquipPro.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter @Setter
public class Role {
    @Id
    private Long id;
    private String name;

    public Role(String name){
        this.name = name;
    }
}

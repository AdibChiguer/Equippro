package com.EquipPro.backend.response;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
@NotBlank
public class JwtResponse {
    private String cin;
    private String email;
    private String token;
    private String type = "Bearer";
    private List<String> roles;

    public JwtResponse(String cin, String email, String token, List<String> roles) {
        this.cin = cin;
        this.email = email;
        this.token = token;
        this.roles = roles;
    }
}


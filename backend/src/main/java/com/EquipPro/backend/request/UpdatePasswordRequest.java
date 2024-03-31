package com.EquipPro.backend.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UpdatePasswordRequest {
    private String email;
    private String oldPassword;
    private String newPassword;
}

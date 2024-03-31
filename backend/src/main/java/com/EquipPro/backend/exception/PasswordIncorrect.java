package com.EquipPro.backend.exception;

public class PasswordIncorrect extends RuntimeException {
    public PasswordIncorrect(String message) {
        super(message);
    }
}

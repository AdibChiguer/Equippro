package com.EquipPro.backend.service;

public interface EmailService {
    void sendMail(String to, String subject, String body);
}

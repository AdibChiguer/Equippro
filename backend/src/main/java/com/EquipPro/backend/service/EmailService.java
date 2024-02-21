package com.EquipPro.backend.service;

public interface EmailService {
    String sendMail(String to, String subject, String body);
}

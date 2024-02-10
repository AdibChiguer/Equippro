package com.EquipPro.backend.service;

import com.EquipPro.backend.model.Client;
import com.EquipPro.backend.model.Technician;
import com.EquipPro.backend.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUser(String cin);
    void deleteUser(String cin);
    Client registerClient(Client client);
    Technician registerTechnician(Technician technician);
}

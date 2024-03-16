package com.EquipPro.backend.service;

import com.EquipPro.backend.model.Admin;
import com.EquipPro.backend.model.Client;
import com.EquipPro.backend.model.Technician;
import com.EquipPro.backend.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUser(String cin);
    void deleteUser(String email);
    void registerClient(Client client);
    void registerTechnician(Technician technician);
    void registerAdmin(Admin admin);
    User updateClient(Client client);
    User updateTechnician(Technician technician);
    List<Client> getAllClient();
    List<Technician> getAllTechnician();
    User getUserByEmail(String email);
}

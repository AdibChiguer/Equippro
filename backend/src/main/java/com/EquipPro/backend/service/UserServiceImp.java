package com.EquipPro.backend.service;

import com.EquipPro.backend.exception.UserAlreadyExistsException;
import com.EquipPro.backend.exception.UserNotFoundException;
import com.EquipPro.backend.model.*;
import com.EquipPro.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService{
    private final ClientRepository clientRepository;
    private final TechnicianRepository technicianRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminRepository adminRepository;

    @Override
    public List<User> getAllUsers() {
        List<Client> clients = clientRepository.findAll();
        List<Technician> technicians = technicianRepository.findAll();
        List<User> allUsers = new ArrayList<>();
        allUsers.addAll(clients);
        allUsers.addAll(technicians);
        return allUsers;
    }

    @Override
    public User getUser(String cin) {
        Optional<User> user = userRepository.findById(cin);
        if (user.isEmpty()){
            throw new UserNotFoundException("the user with the cin : " + cin + " not found");
        }
        return user.get();
    }

    @Override
    public void deleteUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()){
            throw new UserNotFoundException("the user with the email : " + email + " not found");
        }
        userRepository.deleteByEmail(email);
    }

    @Override
    public void registerClient(Client client) {
        if(clientRepository.existsByEmail(client.getEmail()) || clientRepository.existsById(client.getCin())){
            throw new UserAlreadyExistsException("the client is already exists");
        }
        Role role = roleRepository.findByName("ROLE_client");
        client.setRole(role);
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        userRepository.save(client);
    }

    @Override
    public void registerTechnician(Technician technician) {
        if (technicianRepository.existsByEmail(technician.getEmail()) || technicianRepository.existsById(technician.getCin())){
            throw new UserAlreadyExistsException("the technician is already exists");
        }
        Role role = roleRepository.findByName("ROLE_technician");
        technician.setRole(role);
        technician.setPassword(passwordEncoder.encode(technician.getPassword()));
        userRepository.save(technician);
    }

    @Override
    public void registerAdmin(Admin admin) {
        if(adminRepository.existsByEmail(admin.getEmail()) || adminRepository.existsById(admin.getCin())){
            throw new UserAlreadyExistsException("the Admin is already exists");
        }
        Role role = roleRepository.findByName("ROLE_admin");
        admin.setRole(role);
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        userRepository.save(admin);
    }

    @Override
    public User updateClient(Client client) {
        Optional<Client> theClient = clientRepository.findById(client.getCin());
        if (theClient.isEmpty()){
            throw new UserNotFoundException("the Client not found");
        }
        theClient.get().setNom(client.getNom());
        theClient.get().setPrenom(client.getPrenom());
        theClient.get().setEmail(client.getEmail());
        if(client.getPassword() != null){
            theClient.get().setPassword(passwordEncoder.encode(client.getPassword()));
        }
        return clientRepository.save(theClient.get());
    }

    @Override
    public List<Client> getAllClient() {
        return clientRepository.findAll();
    }

    @Override
    public List<Technician> getAllTechnician() {
        return technicianRepository.findAll();
    }

    @Override
    public User updateTechnician(Technician technician) {
        Optional<Technician> theTechnician = technicianRepository.findById(technician.getCin());
        if (theTechnician.isEmpty()){
            throw new UserNotFoundException("the Client not found");
        }
        theTechnician.get().setNom(technician.getNom());
        theTechnician.get().setPrenom(technician.getPrenom());
        theTechnician.get().setEmail(technician.getEmail());
        if(technician.getPassword() != null) {
            theTechnician.get().setPassword(passwordEncoder.encode(technician.getPassword()));
        }
        theTechnician.get().setSpecialite(technician.getSpecialite());
        return technicianRepository.save(theTechnician.get());
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()){
            throw new UserNotFoundException("User not found");
        }
        return user.get();
    }
}

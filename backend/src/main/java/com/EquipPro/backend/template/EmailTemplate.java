package com.EquipPro.backend.template;

import lombok.Getter;
@Getter
public class EmailTemplate {
    private String technicianRecievedTicketMessage;
    private String clientRecievedTicketMessage;
    @Getter
    private String clientEquipmentFixed;

    public void setClientRecievedTicketMessage(String ref , String clientName , String technicianName) {
        this.clientRecievedTicketMessage = "Hi "+ clientName + ", your equipment with the refrence: " + ref + " has been submitted to the technician: "+ technicianName;
    }

    public void setTechnicianRecievedTicketMessage(String ref , String technicianName) {
        this.technicianRecievedTicketMessage = "Hi "+ technicianName + ", you recieved a new equipment with the refrence: "+ ref;
    }

    public void setClientEquipmentFixed(String ref , String clientName) {
        this.clientEquipmentFixed = "Hi "+ clientName + ", your equipment with the refrence: " + ref + " has been fixed";
    }
}

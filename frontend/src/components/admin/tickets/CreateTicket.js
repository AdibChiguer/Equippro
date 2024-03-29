import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

const CreateTicket = () => {
  const [ticket, setTicket] = useState({
    task: '',
    comment: '',
    equipment: '',
    technician: '',
  });
  const [equipments, setEquipments] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    getALLEquipments();
    getAllTechnicians();
  }, []);

  const getALLEquipments = () => {
    axios.get('http://localhost:8080/equipments/all', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setEquipments(response.data);
      console.log("equipments : ", response.data)
    })
    .catch(error => {
      console.error('Error fetching equipments:', error);
    });
  }

  const getAllTechnicians = () => {
    axios.get('http://localhost:8080/users/technician/all', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setTechnicians(response.data);
      console.log("technicians", response.data)
    })
    .catch(error => {
      console.error('Error fetching technicians:', error);
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleEquipmentChange = (e) => {
    console.log('Equipment:', e.target.value);
    setTicket({ ...ticket, equipment: e.target.value });
  };

  const handleTechnicianChange = (e) => {
    console.log('Technician:', e.target.value);
    setTicket({ ...ticket, technician: e.target.value });
  };

  const submit = () => {
    if (!ticket.equipment) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The Equipment field is required!',
      });
      return;
    }

    ticket.technician = ticket.technician ? { cin: ticket.technician } : null;
    ticket.equipment = { ref: ticket.equipment };

    console.log('Ticket:', ticket);
    axios.post('http://localhost:8080/tickets/create', ticket, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Ticket created successfully!',
        });
        reset();
      })
      .catch(error => {
        console.error('Error creating ticket:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again!',
        });
      });
  }

  const reset = () => {
    setTicket({
      task: '',
      comment: '',
      equipment: '',
      technician: '',
    });
  };

  return (
    <div className="equipment-details-container">
      <div className="equipment-details-header">
        <div className="go-back-container">
          <Link to={'/admin/tickets'}>
            <button>
              <ArrowBackRoundedIcon />
              <p>Back</p>
            </button>
          </Link>
        </div>
        <h1>Ticket Details</h1>
      </div>
      <div className="equipment-details-body">
        <div className="ticket-id-task-container-ticket">
          <div className="task">
            <label>Task</label>
            <input type="text" name="task" value={ticket.task} placeholder="Task" onChange={handleInputChange} />
          </div>
          <div className="comment">
            <label>Comment</label>
            <textarea name="comment" value={ticket.comment} onChange={handleInputChange}></textarea>
          </div>
        </div>
        <div className="equipment-container-ticket">
          <div className="technician-content">
            <label>Equipment</label>
            <select name="equipment" value={ticket.equipment} onChange={handleEquipmentChange} >
              <option value="">Select Equipment</option>
              {equipments.map(equipment => (
                <option key={equipment.ref} value={equipment.ref}>
                  {equipment.ref}   ({equipment.type})
                </option>
              ))}
            </select>
          </div>
          <div className="technician-content">
            <label>Technician</label>
            <select name="technician" value={ticket.technician} onChange={handleTechnicianChange} >
              <option value="">Select Technician</option>
              {technicians.map(technician => (
                <option key={technician.cin} value={technician.cin}>
                  {technician.nom}   ({technician.cin})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="button-container-ticket">
          <button type="button" onClick={submit}>
            <SaveIcon />
            <p>Save</p>
          </button>
          <button type="button" onClick={reset}>
            <DeleteIcon />
            <p>Reset</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTicket;

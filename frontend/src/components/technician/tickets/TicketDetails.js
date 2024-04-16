import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import './ticketDetails.css';

const TicketDetails = () => {
  const { id } = useParams();
  const [ticketDetails, setTicketDetails] = useState({
    id: '',
    openDate: '',
    closeDate: '',
    status: '',
    comment: '',
    task: '',
    equipment: null,
    technician: null
  });

  useEffect(() => {
    getTicketDetails(id);
  } ,[])

  async function getTicketDetails(ticketId) {
    await axios.get(`http://localhost:8080/tickets/ticket/${ticketId}`)
      .then((res) => {
        const details = {
          id: res.data.id,
          openDate: formatDate(res.data.openDate),
          closeDate: res.data.closeDate == null ? 'Not closed yet' : formatDate(res.data.closeDate),
          status: res.data.status,
          comment: res.data.comment,
          task: res.data.task,
          equipment: res.data.equipment,
          technician: res.data.technician
        };
        setTicketDetails(details);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'something went wrong. try again',
        });
      });
  }
  
  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const closeTicket = () => {
    axios.put(`http://localhost:8080/tickets/close/${ticketDetails.id}`)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Ticket closed successfully',
      });
      getTicketDetails(ticketDetails.id);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'something went wrong. try again',
      });
    });
  }

  return (
    <div className="equipment-details-container">
      <div className="equipment-details-header">
        <div className="go-back-container">
          <Link to={'/technician/tickets'}>
            <button>
              <ArrowBackRoundedIcon />
              <p>Back</p>
            </button>
          </Link>
        </div>
        <h1>Ticket Details</h1>
        <div className="delete-btn-container">
          {
            ticketDetails.status === 'closed' ?
             null : 
             <>
              <button className="delete-btn" onClick={() => { closeTicket() }}>
                <p>Close</p>
                <CloseIcon />
              </button>
             </>
          }
        </div>
      </div>
      <div className="equipment-details-body">
        <div className="ticket-id-task-container">
          <div className="ticket-id">
            <label>Ticket ID</label>
            <input type="text" name="id" value={ticketDetails.id} placeholder="Ticket ID" readOnly />
          </div>
          <div className="task">
            <label>Task</label>
            <input type="text" name="task" value={ticketDetails.task} placeholder="Task" readOnly />
          </div>
        </div>
        <div className="open-close-date-container">
          <div className="open-date">
            <label>Open Date</label>
            <input type="text" name="openDate" value={ticketDetails.openDate} placeholder="Open Date" readOnly />
          </div>
          <div className="close-date">
            <label>Close Date</label>
            <input type="text" name="closeDate" value={ticketDetails.closeDate} placeholder="Close Date" readOnly />
          </div>
        </div>
        <div className="status-comment-container">
          <div className="status">
            <label>Status</label>
            <input type="text" name="status" value={ticketDetails.status} placeholder="Status" readOnly />
          </div>
          <div className="comment">
            <label>Comment</label>
            <textarea name="comment" value={ticketDetails.comment} readOnly ></textarea>
          </div>
        </div>
        <div className="equipment-container">
          <div className="equipment">
            <label>Equipment</label>
            <input type="text" name="equipment" value={ticketDetails.equipment ? ticketDetails.equipment.ref : ''} placeholder="Equipment" readOnly />
          </div>
          <div className="owner">
            <label>Owner</label>
            <input type="text" name="owner" value={ticketDetails.equipment && ticketDetails.equipment.owner ? `${ticketDetails.equipment.owner.cin}   (${ticketDetails.equipment.owner.nom})` : ''} placeholder="Owner" readOnly />
          </div>
        </div>
        <div className="technician-info-container">
          <div className="technician-content">
            <label>Technician</label>
            <input type="text" name="technician" value={ticketDetails.technician ? ticketDetails.technician.cin : ''} placeholder="Technician" readOnly/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetails
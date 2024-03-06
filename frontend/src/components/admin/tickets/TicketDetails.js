import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';

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
  const [editMode, setEditMode] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [originalDetails, setOriginalDetails] = useState({});
  const [changesMade, setChangesMade] = useState(false);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    getTicketDetails(id);
    getAllTechnicians();
  } ,[])

  async function getTicketDetails(ticketId) {
    await axios.get(`http://localhost:8080/tickets/ticket/${ticketId}`)
      .then((res) => {
        // console.log(res.data);
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
        console.log(
          details.equipment.owner.cin
        );
        setTicketDetails(details);
        setOriginalDetails(details);
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

  function getAllTechnicians() {
    axios.get('http://localhost:8080/users/technician/all')
      .then((res) => {
        setTechnicians(res.data);
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

  function saveChanges() {
    console.log('Saving changes:', ticketDetails);
    const openDateArray = ticketDetails.openDate.split('-').map(Number);
    const openDate = {
        year: openDateArray[0],
        month: openDateArray[1],
        dayOfMonth: openDateArray[2]
    };
    ticketDetails.openDate = openDate;
    
    const updatedDetails = { 
      id: ticketDetails.id,
      openDate: ticketDetails.openDate,
      closeDate: ticketDetails.closeDate == 'Not closed yet' || ticketDetails.closeDate == null ? null : ticketDetails.closeDate,
      status: ticketDetails.status,
      comment: ticketDetails.comment,
      task: ticketDetails.task,
      equipment: ticketDetails.equipment,
      technician: ticketDetails.technician
     };

    axios.put('http://localhost:8080/equipments/update', updatedDetails)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Changes saved successfully',
          showConfirmButton: true,
          timer: 1500,
        });
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

  const handleEditToggle = () => {
    if (editMode && changesMade) {
      saveChanges();
      setEditMode(false);
      setReadOnly(true);
      setChangesMade(false);
    } else if (!editMode) {
      setEditMode(true);
      setReadOnly(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setReadOnly(true);
    setTicketDetails(originalDetails);
    setChangesMade(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails({ ...ticketDetails, [name]: value });
    setChangesMade(true);
  };

  return (
    <div className="equipment-details-container">
      <div className="equipment-details-header">
        <div className="go-back-container">
          <Link to={'/tickets'}>
            <button>
              <ArrowBackRoundedIcon />
              <p>Back</p>
            </button>
          </Link>
        </div>
        <h1>Ticket Details</h1>
        <div className="delete-btn-container">
          <button className="delete-btn" onClick={() => { console.log('deleted' + ticketDetails) }}>
            <p>Delete</p>
            <DeleteIcon />
          </button>
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
            <input type="text" name="task" value={ticketDetails.task} placeholder="Task" readOnly={readOnly} onChange={handleInputChange} />
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
            <textarea name="comment" value={ticketDetails.comment} readOnly={readOnly} onChange={handleInputChange}></textarea>
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
          <label>Technician</label>
            {editMode == false ? (
              <input type="text" name="technician" value={ticketDetails.technician ? ticketDetails.technician.cin : ''} placeholder="Technician" readOnly/>
            ) : (
              <select name="technician" id="technician-select" onChange={handleInputChange} value={ticketDetails.technician ? ticketDetails.technician.cin : ''}>
                {technicians.map((technician) => {
                  return <option key={technician.cin} value={technician.cin}>{technician.cin}</option>;
                })}
              </select>
            )}
        </div>
        <div className="edit-btn-container">
          <button onClick={handleEditToggle} disabled={editMode && !changesMade}>
            {editMode === false ? (
              <>
                <p>Edit</p>
                <EditIcon />
              </>
            ) : (
              <>
                <p>Save</p>
                <SaveIcon />
              </>
            )}
          </button>
          {editMode && (
            <button className="cancel-btn" onClick={handleCancel}>
              <p>Cancel</p>
              <CancelIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketDetails
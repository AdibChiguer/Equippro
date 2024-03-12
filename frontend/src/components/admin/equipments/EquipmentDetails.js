import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'; 
import Swal from 'sweetalert2';
import './equipmentDetails.css';

const EquipmentDetails = () => {
  const { ref } = useParams();
  const [equipmentDetails, setEquipmentDetails] = useState({
    reference: '',
    type: '',
    available: '',
    creationdate: '',
    owner: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [originalDetails, setOriginalDetails] = useState({});
  const [changesMade, setChangesMade] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getEquipmentDetails(ref);
    getAllClients();
  }, [ref]);

  function getEquipmentDetails(reference) {
    axios.get(`http://localhost:8080/equipments/equipment/${reference}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log(res.data);
        const creationDate = formatDate(res.data.creationDate);
        const details = {
          reference: res.data.ref,
          type: res.data.type,
          available: res.data.available.toString(),
          creationdate: creationDate,
          owner: res.data.owner == null ? 'Not in use' : res.data.owner.cin,
        };
        setEquipmentDetails(details);
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

  function getAllClients() {
    axios.get('http://localhost:8080/users/clients/all', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        setClients(res.data);
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

  async function deleteEquipment(reference) {
    console.log(reference);
    await axios.delete(`http://localhost:8080/equipments/delete/equipment/${reference}` , {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Equipment deleted successfully',
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          window.location.href = '/equipments';
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

  function saveChanges() {
    console.log('Saving changes:', equipmentDetails);
    // const creationDateArray = equipmentDetails.creationdate.split('-').map(Number);
    // const creationDate = {
    //     year: creationDateArray[0],
    //     month: creationDateArray[1],
    //     dayOfMonth: creationDateArray[2]
    // };
    // equipmentDetails.creationdate = creationDate;
    
    const updatedDetails = { 
      ref: equipmentDetails.reference,
      type: equipmentDetails.type,
      available: equipmentDetails.available,
      creationDate: equipmentDetails.creationdate,
      owner: { cin: equipmentDetails.owner},
     };

    axios.put('http://localhost:8080/equipments/update', updatedDetails , {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
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

  function ConfirmDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEquipment(equipmentDetails.reference);
      }
    });
  }

  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

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
    setEquipmentDetails(originalDetails);
    setChangesMade(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipmentDetails({ ...equipmentDetails, [name]: value });
    setChangesMade(true);
  };



  return (
    <div className="equipment-details-container">
      <div className="equipment-details-header">
        <div className="go-back-container">
          <Link to={'/equipments'}>
            <button>
              <ArrowBackRoundedIcon />
              <p>Back</p>
            </button>
          </Link>
        </div>
        <h1>Equipment Details</h1>
        <div className="delete-btn-container">
          <button className="delete-btn" onClick={() => { ConfirmDelete() }}>
            <p>Delete</p>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <div className="equipment-details-body">
        <div className="ref-available-container">
          <div className="ref">
            <label>Reference</label>
            <input type="text" name="reference" value={equipmentDetails.reference} placeholder="Reference" readOnly />
          </div>
          <div className="available">
            <label>Available</label>
            {editMode == false ? (
              <input type="text" className="available-input" name="available" value={equipmentDetails.available == 'true' ? 'YES' : 'NO'} placeholder="Available" readOnly={readOnly} onChange={handleInputChange} />
            ) : (
              <select name="available" id="availabe-select" onChange={handleInputChange} value={equipmentDetails.available}>
                <option value="true">YES</option>
                <option value="false">NO</option>
              </select>
            )}
          </div>
        </div>
        <div className="type-creationDate-container">
          <div className="type-container">
            <label>Type</label>
            <input type="text" name="type" value={equipmentDetails.type} placeholder="Type" readOnly={readOnly} onChange={handleInputChange} />
          </div>
          <div className="creation-date-container">
            <label>Creation Date</label>
            <input type="text" name="creationdate" value={equipmentDetails.creationdate} placeholder="Creation Date" readOnly={readOnly} onChange={handleInputChange} />
          </div>
        </div>
        <div className="clients-container">
          <label>Client</label>
          {editMode == false ? (
            <input type="text" name="owner" value={equipmentDetails.owner} placeholder="Client" readOnly={readOnly} onChange={handleInputChange} />
          ) : (
            <select name="owner" id="client-select" onChange={handleInputChange} value={equipmentDetails.owner}>
              {clients.map((client) => {
                return <option key={client.cin} value={client.cin}>{client.cin}</option>;
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
  );
};

export default EquipmentDetails;

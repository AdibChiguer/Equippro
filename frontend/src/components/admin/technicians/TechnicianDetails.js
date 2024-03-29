import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'; // Import Cancel icon
import Swal from 'sweetalert2';

const TechnicianDetails = () => {
  const { cin } = useParams();
  const [technicianDetails, setTechnicianDetails] = useState({
    cin: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    specialite: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [originalDetails, setOriginalDetails] = useState({});
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    getTechnicianDetails(cin);
  }, []);

  function getTechnicianDetails(cinTechnician) {
    axios.get(`http://localhost:8080/users/${cinTechnician}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      const details = {
        cin: res.data.cin,
        firstName: res.data.prenom,
        lastName: res.data.nom,
        email: res.data.email,
        password: res.data.password,
        specialite: res.data.specialite,
      };
      setTechnicianDetails(details);
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

  function saveChanges() {
    console.log('Saving changes:', technicianDetails);

    const updatedDetails = { 
      cin: technicianDetails.cin,
      nom: technicianDetails.lastName,
      prenom: technicianDetails.firstName,
      email: technicianDetails.email,
      password: technicianDetails.password == '' || technicianDetails.password == null ? null : technicianDetails.password,
      specialite: technicianDetails.specialite,
    };
    console.log(updatedDetails);
    
    axios.put('http://localhost:8080/auth/update/technician', updatedDetails , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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
    setTechnicianDetails(originalDetails);
    setChangesMade(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTechnicianDetails({ ...technicianDetails, [name]: value });
    setChangesMade(true);
  };

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
        console.log('Deleting:', technicianDetails.cin);
        // deleteEquipment(equipmentDetails.reference);
      }
    });
  }

  return (
    <div className="equipment-details-container">
      <div className="equipment-details-header">
        <div className="go-back-container">
          <Link to={'/admin/technicians'}>
            <button>
              <ArrowBackRoundedIcon />
              <p>Back</p>
            </button>
          </Link>
        </div>
        <h1>Technician Details</h1>
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
            <label>Cin</label>
            <input type="text" name="cin" value={technicianDetails.cin} placeholder="cin" readOnly />
          </div>
          <div className="available">
            <label>Email</label>
            <input type="email" className="available-input" name="email" value={technicianDetails.email} placeholder="email" readOnly={readOnly} onChange={handleInputChange} />
          </div>
        </div>
        <div className="type-creationDate-container">
          <div className="type-container">
            <label>Nom</label>
            <input type="text" name="firstName" value={technicianDetails.firstName} placeholder="last name" readOnly={readOnly} onChange={handleInputChange} />
          </div>
          <div className="creation-date-container">
            <label>Prenom</label>
            <input type="text" name="lastName" value={technicianDetails.lastName} placeholder="first name" readOnly={readOnly} onChange={handleInputChange} />
          </div>
        </div>
        <div className="technician-speciality-password-container">
          <div className="speciality-container">
            <label>Speciality</label>
            <input type="text" name="specialite" value={technicianDetails.specialite} placeholder="speciality" readOnly={readOnly} onChange={handleInputChange} />
          </div>
          <div className="technician-container">
            {editMode === true ? 
              <>
                <label>Password</label>
                <input type="text" name="password" value={technicianDetails.password} placeholder="password" readOnly={readOnly} onChange={handleInputChange} />
              </> : ''}
          </div>
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

export default TechnicianDetails
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

const CreateEquipment = () => {
  const [equipment, setEquipment] = useState({
    ref: '',
    type: '',
    owner: null, // Set default value to null
  });
  const [isOwnerChecked, setIsOwnerChecked] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/users/clients/all')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipment({ ...equipment, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setIsOwnerChecked(e.target.checked);
    if (!e.target.checked) {
      setEquipment({ ...equipment, owner: null });
    }
  };

  const handleOwnerChange = (e) => {
    console.log('Owner:', e.target.value);
    setEquipment({ ...equipment, owner: e.target.value });
  };

  const submit = () => {
    // Form submission logic
    if (!equipment.ref || !equipment.type) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the required fields!',
      });
      return;
    }
    const dataToSend = {
      ref: equipment.ref,
      type: equipment.type,
      owner: equipment.owner ? { cin: equipment.owner } : null,
    };
    
    axios.post('http://localhost:8080/equipments/create', dataToSend)
      .then(response => {
        console.log('Equipment added:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Equipment added successfully!',
        });
        reset();
      })
      .catch(error => {
        console.error('Error adding equipment:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  }

  const reset = () => {
    setEquipment({
      ref: '',
      type: '',
      owner: null,
    });
    setIsOwnerChecked(false);
  };

  return (
    <div className="create-tecnician-container">
      <div className="equipment-details-header">
        <div className="go-back-container">
          <Link to={'/equipments'}>
            <button>
              <ArrowBackRoundedIcon />
              <p>Back</p>
            </button>
          </Link>
        </div>
        <h1>Create Equipment</h1>
      </div>
      <form className="equipment-details-form" onSubmit={submit}>
        <div className="content">
          <div className="row-input-1">
            <div className="input-container">
              <label>Reference</label>
              <input
                type="text"
                name="ref"
                value={equipment.ref}
                onChange={handleInputChange}
                placeholder='Enter reference...'
              />
            </div>
            <div className="input-container">
              <label>Type</label>
              <input
                type="text"
                name="type"
                value={equipment.type}
                onChange={handleInputChange}
                placeholder='Enter type...'
              />
            </div>
            <div className="client-checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={isOwnerChecked}
                  onChange={handleCheckboxChange}
                />
                <p>Assign Owner</p>
              </label>
            </div>
          </div>
          <div className="row-input-2">
            <div className="input-container">
              {isOwnerChecked && (
                <>
                  <label>Owner</label>
                  <select name="owner" onChange={handleOwnerChange} value={equipment.owner}>
                    <option value="">Select Owner</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.cin}>
                        {client.nom}   ({client.cin})
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="button-container">
          <button type="button" onClick={submit}>
            <SaveIcon />
            <p>Save</p>
          </button>
          <button type="button" onClick={reset}>
            <DeleteIcon />
            <p>Reset</p>
          </button>
        </div>
      </form>
    </div>
  );
};


export default CreateEquipment;

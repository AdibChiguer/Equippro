import React, {useState} from 'react'

import { Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import './createTechnician.css';


const CreateTechnician = () => {
  const [technician, setTechnician] = useState({
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    specialite: '',
    password: ''
  });

  function handleLogin(e) {
    e.preventDefault()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTechnician({ ...technician, [name]: value });
  };

  function reset() {
    setTechnician({
      cin: '',
      nom: '',
      prenom: '',
      email: '',
      specialite: '',
      password: ''
    })
  }

  function submit() {
    console.log(technician);
    axios.post('http://localhost:8080/auth/register/technician', technician , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: 'Technician has been added',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Technician has not been added',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    });
  }


  return (
    <div className="create-tecnician-container">
      <div className="equipment-details-header">
        <div className="go-back-container">
          <Link to={'/technicians'}>
            <button>
              <ArrowBackRoundedIcon />
              <p>Back</p>
            </button>
          </Link>
        </div>
        <h1>Create Technician</h1>
      </div>
      <form className="equipment-details-form" onSubmit={handleLogin}>
        <div className="content">
          <div className="row-input-1">
            <div className="input-container">
              <label>CIN</label>
              <input
                type="text"
                name="cin"
                value={technician.cin}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                name="nom"
                value={technician.nom}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                name="prenom"
                value={technician.prenom}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row-input-2">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={technician.cmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Speciality</label>
              <input
                type="text"
                name="specialite"
                value={technician.specialite}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={technician.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button
            type="submit"
            onClick={() => submit()}
          >
            <SaveIcon />
            <p>Save</p>
          </button>
          <button onClick={() => reset()}>
            <DeleteIcon />
            <p>Reset</p>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTechnician
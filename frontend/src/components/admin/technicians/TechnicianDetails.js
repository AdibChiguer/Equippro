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
  const [technicianDetails, setTechnicainDetails] = useState({
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
    axios.get(`http://localhost:8080/users/${cinTechnician}`)
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
      setTechnicainDetails(details);
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

  return (
    <div>TechnicianDetails</div>
  )
}

export default TechnicianDetails
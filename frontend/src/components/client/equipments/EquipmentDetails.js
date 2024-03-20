import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Swal from 'sweetalert2';
import './equipmentDetails.css';
import { useJwt } from 'react-jwt';

const EquipmentDetails = () => {
  const { ref } = useParams();
  const [equipmentDetails, setEquipmentDetails] = useState({
    reference: '',
    type: '',
    available: '',
    creationdate: '',
    owner: '',
  });
  const [user , setUser] = useState('')
  const token = localStorage.getItem('token')
  const { decodedToken, isExpired } = useJwt(token);
  

  useEffect(() => {
    if (decodedToken) {
      getEquipmentDetails(ref , decodedToken.sub);
    }
  }, [ref, decodedToken]);

  function getEquipmentDetails(reference , email) {
    axios.get(`http://localhost:8080/equipments/owned/info?ref=${reference}&email=${email}`, {
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

  return (
    <div className="equipment-details-container">
      <div className="equipment-details-header">
        <div className="go-back-container">
          <Link to={'/client/home'}>
            <button>
              <ArrowBackRoundedIcon />
              <p>Back</p>
            </button>
          </Link>
        </div>
        <h1>Equipment Details</h1>
      </div>
      <div className="equipment-details-body">
        <div className="ref-available-container">
          <div className="ref">
            <label>Reference</label>
            <input type="text" name="reference" value={equipmentDetails.reference} placeholder="Reference" readOnly />
          </div>
          <div className="available">
            <label>Available</label>
              <input type="text" className="available-input" name="available" value={equipmentDetails.available == 'true' ? 'YES' : 'NO'} placeholder="Available" readOnly/>
          </div>
        </div>
        <div className="type-creationDate-container">
          <div className="type-container">
            <label>Type</label>
            <input type="text" name="type" value={equipmentDetails.type} placeholder="Type" readOnly />
          </div>
          <div className="creation-date-container">
            <label>Creation Date</label>
            <input type="text" name="creationdate" value={equipmentDetails.creationdate} placeholder="Creation Date" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;

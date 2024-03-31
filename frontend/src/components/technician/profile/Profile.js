import React, {useEffect , useState} from 'react'
import './profile.css'
import profilePic from '../../../assets/adminPhoto.jpg';
import axios from 'axios';
import { useJwt } from 'react-jwt';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';

const Profile = () => {
  const [user , setUser] = useState('')
  const token = localStorage.getItem('token')
  const { decodedToken, isExpired } = useJwt(token);
  const [editMode, setEditMode] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [passwords , setPasswords] = useState({
    password: '',
    NewPassword: '',
    ConfirmPassword: ''
  });

  useEffect(() => {
    if (decodedToken) {
      axios.get(`http://localhost:8080/users/user/info/${decodedToken.sub}`)
      .then((response) => {
        setUser(response.data);
        console.log("ttt:" ,response.data);
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [decodedToken]);  

  function saveChanges() {
    if (passwords.NewPassword === '' || passwords.ConfirmPassword === '' || passwords.password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All passwords required!',
      });
      return;
    }
    if (passwords.NewPassword !== passwords.ConfirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match',
      });
      return;
    }
    else {
      axios.put(`http://localhost:8080/auth/update-password`, {
        email: decodedToken.sub,
        oldPassword: passwords.password,
        newPassword: passwords.NewPassword
      } , {headers: {Authorization: `Bearer ${token}`}})
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password updated successfully',
        });
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      })
      console.log("passwords", passwords);
    }
  }

  const handleEditToggle = () => {
    if (editMode && changesMade) {
      saveChanges();
      setEditMode(false);
      setChangesMade(false);
      saveChanges();
    } else if (!editMode) {
      setEditMode(true);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setChangesMade(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    setChangesMade(true);
  };

  return (
    <div className='profile-container'>
      <div className="picture-contianer">
        <span>profile picture</span>
        <div className="img-contianer">
          <img src={profilePic} alt="profile" />
        </div>
      </div>
      <div className="profile-details">
        <div className="input-details">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder='Email' value={user.email} readOnly/>
        </div>
        <div className="input-details">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" placeholder='First Name' value={user.prenom} readOnly/>
        </div>
        <div className="input-details">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" placeholder='Last Name' value={user.nom} readOnly/>
        </div>
        <div className="input-details">
          <label htmlFor="cin">Cin</label>
          <input type="text" id="cin" placeholder='Cin' value={user.cin} readOnly/>
        </div>
        <div className="input-details">
          <label htmlFor="specialite">Specialite</label>
          <input type="text" id="specialite" placeholder='Specialite' value={user.specialite} readOnly/>
        </div>

        
        { editMode === true ? (
          <>
            <div className="input-details">
              <label htmlFor="password">Password</label>
              <input type="password" id="Password" placeholder='Password' name="password" onChange={handleInputChange}/>
            </div>
            <div className="input-details">
              <label htmlFor="New-password">New Password</label>
              <input type="password" id="New-password" placeholder='New Password' name="NewPassword" onChange={handleInputChange}/>
            </div>
            <div className="input-details">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder='Confirm Password' name="ConfirmPassword" onChange={handleInputChange}/>
            </div>
          </>
        ) : ""
        }
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

export default Profile
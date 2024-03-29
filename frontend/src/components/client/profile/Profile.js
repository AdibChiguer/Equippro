import React, {useEffect , useState} from 'react'
import './profile.css'
import profilePic from '../../../assets/adminPhoto.jpg'
import axios from 'axios';
import { useJwt } from 'react-jwt';

const Profile = () => {
  const [user , setUser] = useState('')
  const token = localStorage.getItem('token')
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (decodedToken) {
      axios.get(`http://localhost:8080/users/user/${decodedToken.sub}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }, [decodedToken]);  


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
          <input type="text" id="email" placeholder='Email' readOnly/>
        </div>
        <div className="input-details">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" placeholder='First Name' readOnly/>
        </div>
        <div className="input-details">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" placeholder='Last Name' readOnly/>
        </div>
      </div>
    </div>
  )
}

export default Profile
import React from 'react'
import './profile.css'
import profilePic from '../../../assets/adminPhoto.jpg'

const Profile = () => {
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
          <input type="text" id="email" placeholder='Email'/>
        </div>
        <div className="input-details">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" placeholder='First Name'/>
        </div>
        <div className="input-details">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" placeholder='Last Name'/>
        </div>
        <div className="input-details">
          <label htmlFor="password">Previous Password</label>
          <input type="password" id="password" placeholder='Previous Password'/>
        </div>
        <div className="input-details">
          <label htmlFor="newpassword">New Password</label>
          <input type="password" id="newpassword" placeholder='New Password'/>
        </div>
      </div>
    </div>
  )
}

export default Profile
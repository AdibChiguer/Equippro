import React from 'react'
import './header.css'
import adminPhoto from '../../../assets/adminPhoto.jpg'

const Header = ({username}) => {
  return (
    <div className='header-container'>
      <div className='hello-div'>
        <p>Wellcome, {username}</p>
      </div>
      <div className='profile-photo'>
        <img src={adminPhoto} alt="profile"/>
      </div>
    </div>
  )
}

export default Header
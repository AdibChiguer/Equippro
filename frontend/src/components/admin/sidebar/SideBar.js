import React from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import './sideBar.css'
import logo from '../../../assets/E.png'

const SideBar = () => {
  return (
    <div className='sidebar-container'>
      <div className='sidebar-logo-container'>
        <img src={logo} alt="logo" />
      </div>
      <div className='sidebar-links-container'>
        <span className='sidebar-nav-span'>HOME</span>
        <div className='sidebar-navigation-btn active'>
          <DashboardOutlinedIcon/>
          <p>Overview</p>
        </div>
        <span className='sidebar-nav-span'>GESTION</span>
        <div className='sidebar-navigation-btn hover'>
          <ConstructionOutlinedIcon/>
          <p>Equipments</p>
        </div>
        <div className='sidebar-navigation-btn hover'>
          <PersonOutlinedIcon/>
          <p>Clients</p>
        </div>
        <div className='sidebar-navigation-btn hover'>
          <EngineeringOutlinedIcon/>
          <p>Technicians</p>
        </div>
        <div className='sidebar-navigation-btn hover'>
          <ConfirmationNumberOutlinedIcon/>
          <p>Tickets</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar
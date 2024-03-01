import React, { useState } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import './sideBar.css';
import logo from '../../../assets/E.png';

const SideBar = () => {
  const [activeItem, setActiveItem] = useState('Overview'); // Initialize active item state

  const handleItemClick = (itemName) => {
    setActiveItem(itemName); // Update active item state
  };

  return (
    <div className='sidebar-container'>
      <div className='sidebar-logo-container'>
        <img src={logo} alt="logo" />
      </div>
      <div className='sidebar-links-container'>
        <span className='sidebar-nav-span'>HOME</span>
        <div 
          className={`sidebar-navigation-btn ${activeItem === 'Overview' ? 'active' : 'hover'}`} 
          onClick={() => handleItemClick('Overview')}
        >
          <DashboardOutlinedIcon/>
          <p>Overview</p>
        </div>
        <span className='sidebar-nav-span'>GESTION</span>
        <div 
          className={`sidebar-navigation-btn ${activeItem === 'Equipments' ? 'active' : 'hover'}`} 
          onClick={() => handleItemClick('Equipments')}
        >
          <ConstructionOutlinedIcon/>
          <p>Equipments</p>
        </div>
        <div 
          className={`sidebar-navigation-btn ${activeItem === 'Clients' ? 'active' : 'hover'}`} 
          onClick={() => handleItemClick('Clients')}
        >
          <PersonOutlinedIcon/>
          <p>Clients</p>
        </div>
        <div 
          className={`sidebar-navigation-btn ${activeItem === 'Technicians' ? 'active' : 'hover'}`} 
          onClick={() => handleItemClick('Technicians')}
        >
          <EngineeringOutlinedIcon/>
          <p>Technicians</p>
        </div>
        <div 
          className={`sidebar-navigation-btn ${activeItem === 'Tickets' ? 'active' : 'hover'}`} 
          onClick={() => handleItemClick('Tickets')}
        >
          <ConfirmationNumberOutlinedIcon/>
          <p>Tickets</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
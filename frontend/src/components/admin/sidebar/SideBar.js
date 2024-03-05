import React, { useState } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import './sideBar.css';
import logo from '../../../assets/E.png';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  // determine active item based on pathname
  const determineActiveItem = (pathname) => {
    if (pathname === '/home') return 'Overview';
    if (pathname === '/equipments') return 'Equipments';
    if (pathname === '/clients') return 'Clients';
    if (pathname === '/technicians') return 'Technicians';
    if (pathname === '/tickets') return 'Tickets';
    return '';
  };

  // Set active item
  React.useEffect(() => {
    setActiveItem(determineActiveItem(location.pathname));
  }, [location.pathname]);

  return (
    <div className='sidebar-container'>
      <div className='sidebar-logo-container'>
        <img src={logo} alt="logo" />
      </div>
      <div className='sidebar-links-container'>
        <span className='sidebar-nav-span'>HOME</span>
        <Link to={'/home'}>
          <div 
            className={`sidebar-navigation-btn ${activeItem === 'Overview' ? 'active' : 'hover'}`} 
            onClick={() => handleItemClick('Overview')}
          >
              <DashboardOutlinedIcon/>
              <p>Overview</p>
          </div>
        </Link>
        <span className='sidebar-nav-span'>GESTION</span>
        <Link to={'/equipments'}>
          <div 
            className={`sidebar-navigation-btn ${activeItem === 'Equipments' ? 'active' : 'hover'}`} 
            onClick={() => handleItemClick('Equipments')}
          >
              <ConstructionOutlinedIcon/>
              <p>Equipments</p>
          </div>
        </Link>
        <Link to={'/clients'}>
          <div 
            className={`sidebar-navigation-btn ${activeItem === 'Clients' ? 'active' : 'hover'}`} 
            onClick={() => handleItemClick('Clients')}
          >
              <PersonOutlinedIcon/>
              <p>Clients</p>
          </div>
        </Link>
        <Link to={'/technicians'}>
          <div 
            className={`sidebar-navigation-btn ${activeItem === 'Technicians' ? 'active' : 'hover'}`} 
            onClick={() => handleItemClick('Technicians')}
          >
              <EngineeringOutlinedIcon/>
              <p>Technicians</p>
          </div>
        </Link>
        <Link to={'/tickets'}>
          <div 
            className={`sidebar-navigation-btn ${activeItem === 'Tickets' ? 'active' : 'hover'}`} 
            onClick={() => handleItemClick('Tickets')}
          >
              <ConfirmationNumberOutlinedIcon/>
              <p>Tickets</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
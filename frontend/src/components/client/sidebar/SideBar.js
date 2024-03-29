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
    if (pathname === '/client/home') return 'Overview';
    if (pathname === '/client/tickets') return 'Tickets';
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
        <Link to={'/client/home'}>
          <div 
            className={`sidebar-navigation-btn ${activeItem === 'Overview' ? 'active' : 'hover'}`} 
            onClick={() => handleItemClick('Overview')}
          >
              <DashboardOutlinedIcon/>
              <p>EQUIPMENTS</p>
          </div>
        </Link>
        <span className='sidebar-nav-span'>TICKET</span>
        <Link to={'/client/tickets'}>
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
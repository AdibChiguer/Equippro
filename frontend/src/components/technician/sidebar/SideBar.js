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
    if (pathname === '/technician/fixing') return 'fixing';
    if (pathname === '/technician/fixed') return 'fixed';
    if (pathname === '/technician/tickets') return 'Tickets';
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
        <span className='sidebar-nav-span'>Equipments</span>
        <Link to={'/technician/fixing'}>
          <div 
            className={`sidebar-navigation-btn ${activeItem === 'fixing' ? 'active' : 'hover'}`} 
            onClick={() => handleItemClick('fixing')}
          >
              <ConstructionOutlinedIcon/>
              <p>Fixing Equipments</p>
          </div>
        </Link>
        <Link to={'/technician/fixed'}>
          <div 
            className={`sidebar-navigation-btn ${activeItem === 'fixed' ? 'active' : 'hover'}`} 
            onClick={() => handleItemClick('fixed')}
          >
              <ConstructionOutlinedIcon/>
              <p>Fixed Equipments</p>
          </div>
        </Link>
        <span className='sidebar-nav-span'>Tickets</span>
        <Link to={'/technician/tickets'}>
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
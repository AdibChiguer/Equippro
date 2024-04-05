import React, {useState} from 'react'
import './header.css'
import {
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import adminPhoto from '../../../assets/adminPhoto.jpg'
import { Link , useNavigate } from 'react-router-dom';

const Header = ({username}) => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const navigate = useNavigate();

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('logout');
    navigate('/');
  };


  return (
    <div className='header-container'>
      <div className='hello-div'>
        <p>Wellcome, {username}</p>
      </div>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <div className='profile-photo'>
          <img src={adminPhoto} alt="profile"/>
        </div>
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonOutlinedIcon width={20} />
          </ListItemIcon>
          <Link to={'/admin/profile'}>
            <ListItemText>My Profile</ListItemText>
          </Link>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button  variant="outlined" color="primary" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Menu>
    </div>
  )
}

export default Header
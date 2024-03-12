// src/components/admin/Admin.js
import React from 'react';
import SideBar from './sidebar/SideBar';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
const Admin = ({ username }) => {
  return (
    <div>
      <SideBar />
      <div className='main-container'>
        <Header username={username} />
        <div className='main-div'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;

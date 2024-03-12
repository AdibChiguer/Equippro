// src/routes.js
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Home from './components/admin/home/Home';
import Equipments from './components/admin/equipments/Equipments';
import ClientAdmin from './components/admin/clients/ClientAdmin';
import TechnicianAdmin from './components/admin/technicians/TechnicianAdmin';
import Tickets from './components/admin/tickets/Tickets';
import EquipmentDetails from './components/admin/equipments/EquipmentDetails';
import ClientDetails from './components/admin/clients/ClientDetails';
import TechnicianDetails from './components/admin/technicians/TechnicianDetails';
import TicketDetails from './components/admin/tickets/TicketDetails';
import CreateTechnician from './components/admin/technicians/CreateTechnician';
import CreateEquipment from './components/admin/equipments/CreateEquipment';
import CreateClient from './components/admin/clients/CreateClient';
import Profile from './components/admin/profile/Profile';
import Auth from './components/auth/Auth';
import Error from './components/auth/error/Error';
import Login from './components/auth/login/Login';
import Admin from './components/admin/Admin';

// export const adminRoutes = [
//   { path: '/home', element: <Home /> },
//   { path: '/equipments', element: <Equipments /> },
//   { path: '/equipment-details/:ref', element: <EquipmentDetails /> },
//   { path: '/create-equipment', element: <CreateEquipment /> },
//   { path: '/clients', element: <ClientAdmin /> },
//   { path: '/client-details/:cin', element: <ClientDetails /> },
//   { path: '/create-client', element: <CreateClient /> },
//   { path: '/technicians', element: <TechnicianAdmin /> },
//   { path: '/technician-details/:cin', element: <TechnicianDetails /> },
//   { path: '/create-technician', element: <CreateTechnician /> },
//   { path: '/tickets', element: <Tickets /> },
//   { path: '/ticket-details/:id', element: <TicketDetails /> },
//   { path: '/profile', element: <Profile /> },
// ];

// export const publicRoutes = [
//   { path: './login', element: <h1>login</h1> },
// ];

const Router = [
  {
    path: '/',
    element : <Admin/>,
    children : [
      { path: '/', element: <Navigate to="/home" /> },
      { path: '/home', element: <Home /> },
      { path: '/equipments', element: <Equipments /> },
      { path: '/equipment-details/:ref', element: <EquipmentDetails /> },
      { path: '/create-equipment', element: <CreateEquipment /> },
      { path: '/clients', element: <ClientAdmin /> },
      { path: '/client-details/:cin', element: <ClientDetails /> },
      { path: '/create-client', element: <CreateClient /> },
      { path: '/technicians', element: <TechnicianAdmin /> },
      { path: '/technician-details/:cin', element: <TechnicianDetails /> },
      { path: '/create-technician', element: <CreateTechnician /> },
      { path: '/tickets', element: <Tickets /> },
      { path: '/ticket-details/:id', element: <TicketDetails /> },
      { path: '/profile', element: <Profile /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
]

export default Router;
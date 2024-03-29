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
import Client from './components/client/Client';
import Technician from './components/technician/Technician';
import ClientEquipments from './components/client/equipments/Equipments';
import ProtectedRoute from './components/ProtectedRoute';
import ClientProfile from './components/client/profile/Profile';
import ClientEquipmentDetails from './components/client/equipments/EquipmentDetails';
import FixingEquipments from './components/technician/fixing-equipments/FixingEquipments';
import FixedEquipments from './components/technician/fixed-equipments/FixedEquipments';
import TechnicianTickets from './components/technician/tickets/Tickets';
import TechnicianProfile from './components/technician/profile/Profile';
import CreateTicket from './components/admin/tickets/CreateTicket';
import ClientTickets from './components/client/tickets/Tickets';


const Router = [
  {
    path: '/admin',
    element : <ProtectedRoute requiredRoles={['ROLE_admin']}><Admin/></ProtectedRoute>,
    children : [
      { path: '/admin', element: <Navigate to="/admin/home" /> },
      { path: '/admin/home', element: <Home /> },
      { path: '/admin/equipments', element: <Equipments /> },
      { path: '/admin/equipment-details/:ref', element: <EquipmentDetails /> },
      { path: '/admin/create-equipment', element: <CreateEquipment /> },
      { path: '/admin/clients', element: <ClientAdmin /> },
      { path: '/admin/client-details/:cin', element: <ClientDetails /> },
      { path: '/admin/create-client', element: <CreateClient /> },
      { path: '/admin/technicians', element: <TechnicianAdmin /> },
      { path: '/admin/technician-details/:cin', element: <TechnicianDetails /> },
      { path: '/admin/create-technician', element: <CreateTechnician /> },
      { path: '/admin/tickets', element: <Tickets /> },
      { path: '/admin/ticket-details/:id', element: <TicketDetails /> },
      { path: '/admin/create-ticket', element: <CreateTicket /> },
      { path: '/admin/profile', element: <Profile /> },
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
  {
    path: '/client',
    element: <ProtectedRoute requiredRoles={['ROLE_client']}><Client/></ProtectedRoute>,
    children: [
      { path: '/client', element: <Navigate to="/client/home" /> },
      { path: '/client/home', element: <ClientEquipments /> },
      { path: '/client/equipment-details/:ref', element: <ClientEquipmentDetails /> },
      { path: '/client/profile', element: <ClientProfile /> },
      { path: '/client/tickets', element: <ClientTickets />},
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/technician',
    element: <ProtectedRoute requiredRoles={['ROLE_technician']}><Technician/></ProtectedRoute>,
    children: [
      { path: '/technician', element: <Navigate to="/technician/fixing" /> },
      { path: '/technician/fixing', element: <FixingEquipments /> },
      { path: '/technician/fixed', element: <FixedEquipments /> },
      { path: '/technician/tickets', element: <TechnicianTickets /> },
      { path: '/technician/ticket-details/id', element: <TechnicianTickets /> },
      { path: '/technician/profile', element: <TechnicianProfile /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
]

export default Router;
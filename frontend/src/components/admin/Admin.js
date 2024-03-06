import React from 'react'
import SideBar from './sidebar/SideBar';
import Header from './header/Header';
import Home from './home/Home';
import Equipments from './equipments/Equipments';
import ClientAdmin from './clients/ClientAdmin';
import TechnicianAdmin from './technicians/TechnicianAdmin';
import Tickets from './tickets/Tickets'
import { Routes , Route  } from 'react-router-dom';
import EquipmentDetails from './equipments/EquipmentDetails';
import ClientDetails from './clients/ClientDetails';
import TechnicianDetails from './technicians/TechnicianDetails';
import TicketDetails from './tickets/TicketDetails';


const Admin = ({username}) => {
  return (
    <div>
      <SideBar/>
      <div className='main-container'>
        <Header username={username}/>
        <div className='main-div'>
          <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/equipments' element={<Equipments/>} />
            <Route path='/equipment-details/:ref' element={<EquipmentDetails/>} />
            <Route path='/clients' element={<ClientAdmin/>} />
            <Route path='/client-details/:cin' element={<ClientDetails/>} />
            <Route path='/technicians' element={<TechnicianAdmin/>} />
            <Route path='/technician-details/:cin' element={<TechnicianDetails/>} />
            <Route path='/tickets' element={<Tickets/>} />
            <Route path='/ticket-details/:id' element={<TicketDetails/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin
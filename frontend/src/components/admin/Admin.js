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
            <Route path='/clients' element={<ClientAdmin/>} />
            <Route path='/technicians' element={<TechnicianAdmin/>} />
            <Route path='/tickets' element={<Tickets/>} />
            <Route path='/equipment-details/:ref' element={<EquipmentDetails/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin
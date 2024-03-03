import React from 'react'
import SideBar from './sidebar/SideBar';
import Header from './header/Header';
import Home from './home/Home';
import Equipments from './equipments/Equipments';
import ClientAdmin from './clients/ClientAdmin';
import TechnicianAdmin from './technicians/TechnicianAdmin';
import Tickets from './tickets/Tickets'



const Admin = ({username}) => {
  return (
    <div>
      <SideBar/>
      <div className='main-container'>
        <Header username={username}/>
        <div className='main-div'>
          {/* <Home/> */}
          <Equipments/>
          {/* <ClientAdmin/> */}
          {/* <TechnicianAdmin/> */}
          {/* <Tickets/> */}
        </div>
      </div>
    </div>
  )
}

export default Admin
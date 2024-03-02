import './App.css';
import SideBar from './components/admin/sidebar/SideBar';
import Header from './components/admin/header/Header';
import Home from './components/admin/home/Home';
import Equipments from './components/admin/equipments/Equipments';
import ClientAdmin from './components/admin/clients/ClientAdmin';
import TechnicianAdmin from './components/admin/technicians/TechnicianAdmin';
import Tickets from './components/admin/tickets/Tickets'

function App() {
  return (
    <div className='app-container'>
      <SideBar/>
      <div className='main-container'>
        <Header username="adib"/>
        <div className='main-div'>
          {/* <Home/> */}
          {/* <Equipments/> */}
          {/* <ClientAdmin/> */}
          {/* <TechnicianAdmin/> */}
          <Tickets/>
        </div>
      </div>
    </div>
  );
}

export default App;

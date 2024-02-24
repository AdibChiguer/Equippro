import './App.css';
import SideBar from './components/admin/sidebar/SideBar';
import Header from './components/admin/header/Header';
import Home from './components/admin/home/Home';

function App() {
  return (
    <div className='app-container'>
      <SideBar/>
      <div className='main-container'>
        <Header username="adib"/>
        <Home/>
      </div>
    </div>
  );
}

export default App;

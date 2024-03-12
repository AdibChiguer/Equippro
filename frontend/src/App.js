import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import Router from './routes';

function App() {
  const routing = useRoutes(Router);
  return (
    <div className='app-container'>
      {routing}
    </div>
  );
}

export default App;

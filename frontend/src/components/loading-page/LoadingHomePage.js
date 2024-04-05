import React , { useEffect} from "react";
import "./loadingPage.css";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const LoadingHomePage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('token :', token);
    if (!token) {
        navigate('/auth/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const isAuthorized = decodedToken.role[0] === 'ROLE_admin' || decodedToken.role[0] === 'ROLE_client' || decodedToken.role[0] === 'ROLE_technician';
        if (isAuthorized) {
          if (decodedToken.role[0] === 'ROLE_admin') {
            navigate('/admin');
          } else if (decodedToken.role[0] === 'ROLE_client') {
            navigate('/client');
          } else if (decodedToken.role[0] === 'ROLE_technician') {
            navigate('/technician');
          }
        } else {
          navigate('/auth/login');
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  } , [token]);

  return (
    <div className="loading-container">
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingHomePage;

import React, { useEffect, useState } from 'react';
import './home.css';
import Chart from 'react-apexcharts';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:8080/users/clients/all', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get('http://localhost:8080/equipments/all', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get('http://localhost:8080/users/technician/all', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get('http://localhost:8080/equipments/available', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get('http://localhost:8080/equipments/not-used', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get('http://localhost:8080/tickets/all', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        const newData = responses.map(response => response.data.length);
        setData(newData);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        'Clients',
        'Equipments',
        'Technicians',
        'Available Equipments',
        'Not used Equipments',
        'Tickets',
      ],
    },
  };

  const series = [
    {
      name: 'Count',
      data: data,
    },
  ];

  return (
    <div className='home-div-container'>
      <div className='chart-container'>
        <div className='header-chart-container'>
          <span>Overview</span>
        </div>
        <Chart options={options} series={series} type="bar" height="100%" />
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import './home.css';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import Swal from 'sweetalert2';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';

const Home = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: 'donut',
    },
    labels: ['Closed', 'Underway', 'Waiting'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  });

  useEffect(() => {
    axios.get('http://localhost:8080/tickets/statistics', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => {
        console.log(response.data);
        console.log("closed: ", response.data.closed.length, "underway: ", response.data.underway.length, "waiting: ", response.data.waiting.length);
        setSeries([response.data.closed.length, response.data.underway.length, response.data.waiting.length]);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  }, []);

  return (
    <div className='home-div-container'>
      <div className='chart-container'>
        <div className='header-chart-container'>
          <span>Overview</span>
        </div>
        <div className="overview-container">
          <div className="overview-content">
            <div className="overview-item">
              <div className="overview-item-header">
                <DoDisturbIcon/>
                <div className="overview-item-title">Closed</div>
              </div>
              <div className="overview-item-value">{series[0]}</div>
            </div>
            <div className="overview-item">
              <div className="overview-item-header">
                <AltRouteRoundedIcon/>
                <div className="overview-item-title">Underway</div>
              </div>
              <div className="overview-item-value">{series[1]}</div>
            </div>
            <div className="overview-item">
              <div className="overview-item-header">
                <HourglassBottomRoundedIcon/>
                <div className="overview-item-title">Waiting</div>
              </div>
              <div className="overview-item-value">{series[2]}</div>
            </div>
          </div>
          <div className="apexchart-container">
            <div className="overview-chart">
              <ReactApexChart options={options} series={series} type="donut" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
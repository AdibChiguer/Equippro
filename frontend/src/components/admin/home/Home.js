import React , {useEffect , useState} from 'react'
import './home.css'
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const [data , setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:8080/users/clients/all'),
          axios.get('http://localhost:8080/equipments/all'),
          axios.get('http://localhost:8080/users/technician/all'),
          axios.get('http://localhost:8080/equipments/available'),
          axios.get('http://localhost:8080/equipments/not-used'),
          axios.get('http://localhost:8080/tickets/all'),
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

  const optionscolumnchart = {
    chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
            show: true,
        },
        height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
        bar: {
            horizontal: false,
            barHeight: '60%',
            columnWidth: '32%',
            borderRadius: [20],
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'all',
        },
    },
    stroke: {
        show: true,
        width: 5,
        lineCap: "butt",
        colors: ["transparent"],
      },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
            lines: {
                show: false,
            },
        },
    },
    yaxis: {
        tickAmount: 10,
        max: 10,
    },
    xaxis: {
        categories: ['Clients', 'Equipments', 'Technicians', 'Available Equipments', 'Not used Equipments', 'Tickets'],
        axisBorder: {
            show: false,
        },
    },
    tooltip: {
        theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
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
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  )
}

export default Home
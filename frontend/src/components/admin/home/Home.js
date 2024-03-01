import React from 'react'
import './home.css'
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

const Home = () => {

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
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
        },
        xaxis: {
            categories: ['adib', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
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
            name: 'Eanings this month',
            data: [355, 390, 300, 50, 390, 180, 355, 390],
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
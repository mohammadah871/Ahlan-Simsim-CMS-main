import { Paper } from '@mui/material';
import React, { Component, useEffect, useState } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function ApexChart(props) {

    useEffect(() => {

    }, []);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: props.title,
            },
        },
    };

    const labels = props.labels;

    const data = {
        labels,
        datasets: [
            {
                label: 'App',
                data: props.data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };



    return (

        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-20 items-center justify-center ltr">
            <div className='min-h-[400px] max-h-[400px]'>
                <Bar className='min-h-[360px] max-h-[360px]' options={options} data={data} />
            </div>
        </Paper>

    )

}

export default ApexChart;

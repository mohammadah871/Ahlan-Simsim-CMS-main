import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Paper } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function App(props) {
    console.log("props.labels", props.labels)
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'Users',
                data: props.data,
                backgroundColor: [
                    'rgba(237, 224, 90, 1)',
                    'rgba(133, 187, 68, 1)',
                    'rgba(180, 61, 199, 1)',
                    'rgba(188, 207, 49, 1)',
                    'rgba(59, 173, 239, 1)',
                    'rgba(237, 190, 48, 1)',
                    'rgba(239, 156, 31, 1)',
                    'rgba(244, 108, 156, 1)',
                    'rgba(234, 85, 67, 1)'
                ],
                borderColor: [
                    'rgba(237, 224, 90, 1)',
                    'rgba(133, 187, 68, 1)',
                    'rgba(180, 61, 199, 1)',
                    'rgba(188, 207, 49, 1)',
                    'rgba(59, 173, 239, 1)',
                    'rgba(237, 190, 48, 1)',
                    'rgba(239, 156, 31, 1)',
                    'rgba(244, 108, 156, 1)',
                    'rgba(234, 85, 67, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                        family: "Medium"
                    }
                }
            }
        }
    }

    return (
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-20 items-center justify-center ltr
        min-h-[440px] max-h-[440px]
        ">
            <Doughnut className='max-h-[400px]' data={data} options={options} />
        </Paper>
    );
}


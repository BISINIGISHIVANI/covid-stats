
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function PieChartHeader() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Total Cases', 'New Cases', 'Total Deaths', "New Deaths","recovered","Active Cases"],
            datasets: [
                {
                    data: [44756616,0,530965,0,44192837,0],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-300'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-300'),
                        documentStyle.getPropertyValue('--green-300'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card flex justify-content-center align-center">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-20rem" />
        </div>
    )
}
        
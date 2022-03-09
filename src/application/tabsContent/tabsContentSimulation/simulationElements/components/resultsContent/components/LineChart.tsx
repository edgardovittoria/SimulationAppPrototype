import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {Simulation} from "../../../../../../../model/Simulation";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    simulation: Simulation,
}

interface Dataset {
    label: string,
    data: number[],
    borderColor: string,
    backgroundColor: string
}


export const LineChart: React.FC<LineChartProps> = ({simulation}) => {

    const labels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    const datasets: Dataset[] = [];
    simulation.results.forEach(res => {
        datasets.push(
            {
            label: res.name,
            data: res.values,
            borderColor: res.color,
            backgroundColor: res.color
        })
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: (simulation) ? simulation.name : ""
            },
        },
        layout: {
            padding: {
                right: 20,
            },
        }
    };

    const data = {
        labels,
        datasets: datasets
    }

    return (
        <div className="box w-100">
            <Line options={options} data={data}/>
        </div>
    )

}
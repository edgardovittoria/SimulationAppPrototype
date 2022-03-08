import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {Signal} from "../../../../../../../../../../../../../model/Port";
import React from "react";
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    PointElement,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface SignalChartProps {
    signal: Signal,
    type: 'module' | 'phase'
}

interface Dataset {
    label: string,
    data: number[],
    borderColor: string,
    backgroundColor: string,
    lineTension: number
}


export const SignalChart: React.FC<SignalChartProps> = ({signal, type}) => {


    const datasets: Dataset[] = [];
    let frequencyValues: number[] = [];
    let signalReValues: number[] = [];
    let signalImValues: number[] = [];
    signal.signalValues.forEach(value => {
        frequencyValues.push(value.freq)
        signalReValues.push(value.signal.Re)
        signalImValues.push(value.signal.Im)
    })
    if(type === "module"){
        datasets.push({
            label: 'Module',
            data: signalReValues,
            borderColor: 'blue',
            backgroundColor: 'blue',
            lineTension: .5
        })
    }else{
        datasets.push({
            label: 'Phase',
            data: signalImValues,
            borderColor: 'red',
            backgroundColor: 'red',
            lineTension: .5
        })
    }


    const labels = frequencyValues

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: signal.name,
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
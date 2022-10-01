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
import {Simulation} from "../../../../../../../../../model/Simulation";
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../../store/projectSlice";
import {SolverOutputSelector} from "../../../../../../../../../store/solverSlice";

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


export const LineChartRomega: React.FC<LineChartProps> = ({simulation}) => {

    const project = useSelector(selectedProjectSelector)

    let matrix_Z: any = eval(simulation.results.matrix_Z)
    let matrix_S: any = eval(simulation.results.matrix_S)
    let matrix_Y: any = eval(simulation.results.matrix_Y)


    let labels: number[] = []
    project?.signal?.signalValues.forEach(sv => labels.push(sv.freq))
    const datasets: Dataset[] = [];
    let matrix_Z_RE: number[] = []
    matrix_Z.forEach((mz: any[][]) => {
        mz.forEach((mz2: any[]) => {
            matrix_Z_RE.push(mz2[0] as number)
        })
    })
    datasets.push(
        {
            label: "matrix_Z_RE",
            data: matrix_Z_RE,
            borderColor: "red",
            backgroundColor: "white"
        }
    )
    /*simulation.results.forEach(res => {
        datasets.push(
            {
            label: res.name,
            data: res.values,
            borderColor: res.color,
            backgroundColor: res.color
        })
    })*/

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
        <div className="box h-[95%] w-[100%] mt-11">
            <Line options={options} data={data}/>
        </div>
    )

}
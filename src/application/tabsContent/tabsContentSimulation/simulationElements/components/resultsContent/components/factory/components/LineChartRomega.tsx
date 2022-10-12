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
    const colorArray = ["red", "blue", "violet", "green", "orange", "yellow", "pink"]

    let matrix_Z: any = eval(simulation.results.matrix_Z)

    let labels: number[] = []
    project?.signal?.signalValues.forEach(sv => labels.push(sv.freq))
    const datasets: Dataset[] = [];
    let matrices_Z_RE: number[][] = []
    let matrix_Z_RE_value: number[] = []
    matrix_Z.forEach((mz: any[][]) => {
        matrices_Z_RE.push(matrix_Z_RE_value)
        mz.forEach((mz2: any[]) => {
            matrix_Z_RE_value.push(mz2[0]*1000)
        })
    })
    matrices_Z_RE.forEach((matrix, index) => {
        datasets.push(
            {
                label: `Port ${index+1} - R(mOhm)`,
                data: matrix,
                borderColor: colorArray[index],
                backgroundColor: "white"
            }
        )
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
        <div className="box w-[100%]">
            <Line options={options} data={data}/>
        </div>
    )

}
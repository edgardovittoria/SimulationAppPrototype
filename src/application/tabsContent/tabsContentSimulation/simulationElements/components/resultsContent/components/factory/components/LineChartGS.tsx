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


export const LineChartGS: React.FC<LineChartProps> = ({simulation}) => {

    const project = useSelector(selectedProjectSelector)
    const colorArray = ["red", "blue", "violet", "green", "orange", "yellow", "pink"]

    let matrix_Y: any = eval(simulation.results.matrix_Y)

    let labels: number[] = []
    project?.signal?.signalValues.forEach(sv => labels.push(sv.freq))
    const datasets: Dataset[] = [];
    let matrices_Y_RE: number[][] = []
    let matrix_Y_RE_value: number[] = []
    matrix_Y.forEach((mz: any[][]) => {
        matrices_Y_RE.push(matrix_Y_RE_value)
        mz.forEach((mz2: any[]) => {
            matrix_Y_RE_value.push(mz2[0] as number)
        })
    })
    matrices_Y_RE.forEach((matrix, index) => {
        datasets.push(
            {
                label: `Port ${index+1} - G(S)`,
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
        <div className="box w-[100%] mt-11">
            <Line options={options} data={data}/>
        </div>
    )

}
import React from 'react';
import {Simulation} from "../../../../../../../../model/Simulation";
import {LineChartRomega} from "./components/LineChartRomega";
import {LineChartLH} from "./components/LineChartLH";

interface LineChartFactoryProps {
    chart: string,
    simulation: Simulation
}

export const LineChartFactory: React.FC<LineChartFactoryProps> = (
    {
        chart, simulation
    }
) => {
    switch (chart) {
        case 'R(omega)':
            return  <LineChartRomega simulation={simulation}/>
        case 'L(H)':
            return  <LineChartLH simulation={simulation}/>
        default: return <></>
    }

}
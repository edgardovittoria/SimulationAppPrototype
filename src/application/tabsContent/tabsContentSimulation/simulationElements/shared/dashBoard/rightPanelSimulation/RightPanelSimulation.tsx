import React from 'react';
import css from './rightPanelSimulation.module.css';
import {Port, Probe} from "../../../../../../../model/Port";

interface RightPanelSimulationProps {
    ports: (Port | Probe)[] | undefined
}

export const RightPanelSimulation: React.FC<RightPanelSimulationProps> = (
    {children, ports}
) => {
    return (
        <>
            {children}
        </>
    )

}
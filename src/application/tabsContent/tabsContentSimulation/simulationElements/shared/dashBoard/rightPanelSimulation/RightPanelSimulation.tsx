import React from 'react';
import css from './rightPanelSimulation.module.css';
import {Port} from "../../../../../../../model/Port";

interface RightPanelSimulationProps {
    ports: Port[] | undefined
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
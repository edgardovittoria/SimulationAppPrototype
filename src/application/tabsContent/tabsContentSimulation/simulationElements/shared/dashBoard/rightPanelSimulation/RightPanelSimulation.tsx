import React from 'react';
import './rightPanelSimulation.css'

interface RightPanelSimulationProps {
}

export const RightPanelSimulation: React.FC<RightPanelSimulationProps> = (
    {children}
) => {
    return (
        <>
            < div className="rightPanelContainer">
                <div className="rightPanel">
                    {children}
                </div>
            </div>
        </>
    )

}
import React from 'react';
import './rightPanelSimulation.css'
import {ComponentEntity} from "@Draco112358/cad-library";
import {FactoryRightPanelContent} from "../factory/FactoryRightPanelContent";

interface RightPanelSimulationProps {
    section: string,
    assignMaterial: Function,
    selectedComponent: ComponentEntity[],
    resetSelectedComponentsArray: Function,
    setShowSimulationModel: Function
}

export const RightPanelSimulation: React.FC<RightPanelSimulationProps> = (
    {
        section, assignMaterial, selectedComponent, resetSelectedComponentsArray,
        setShowSimulationModel
    }) => {

    console.log(section)

    return (
        <>
            {(selectedComponent.length > 0) &&
                < div className="rightPanelContainer">
                    <div className="rightPanel">
                        <FactoryRightPanelContent
                            section={section}
                            selectedComponent={selectedComponent}
                            assignMaterial={assignMaterial}
                            resetSelectedComponentsArray={resetSelectedComponentsArray}
                            setShowSimulationModel={setShowSimulationModel}
                        />
                    </div>
                </div>
            }
        </>
    )

}
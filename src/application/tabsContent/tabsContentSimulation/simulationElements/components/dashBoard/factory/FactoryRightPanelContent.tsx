import React from 'react';
import {ComponentEntity} from "@Draco112358/cad-library";
import {SelectMaterial} from "./components/SelectMaterial";

interface FactoryRightPanelContentProps {
    section: string,
    selectedComponent: ComponentEntity[],
    assignMaterial: Function,
    resetSelectedComponentsArray: Function,
    setShowSimulationModel: Function
}

export const FactoryRightPanelContent: React.FC<FactoryRightPanelContentProps> = (
    {
        section, selectedComponent, assignMaterial, resetSelectedComponentsArray,
        setShowSimulationModel
    }
) => {
    switch (section) {
        case 'Modeler' :
            return <SelectMaterial
                selectedComponent={selectedComponent}
                assignMaterial={assignMaterial}
                resetSelectedComponentsArray={resetSelectedComponentsArray}
            />

        case 'Physics' :
            return <></>
        case 'Simulator' :
            return (
                <>
                    <span className="py-1">
                        Case Study
                    </span>
                    <hr/>
                    <button
                        className="btn button-primary flex-column"
                        onClick={() => setShowSimulationModel(true)}
                    >
                        <div className="fa fa-power-off me-3" style={{color: '#fff'}}/>
                        Launcher
                    </button>
                </>
            )
        case 'Results' :
            return <></>
        default :
            return <></>
    }


}
import React from 'react';
import {ComponentEntity} from "@Draco112358/cad-library";
import {SelectMaterial} from "./components/SelectMaterial";
import {Material} from "../../../../../../../../model/Material";

interface FactoryRightPanelContentProps {
    section: string,
    selectedComponent: ComponentEntity[],
    assignMaterial: Function,
    resetSelectedComponentsArray: Function,
    setShowSimulationModel: Function,
    availableMaterials: Material[],
    assignedMaterials: Material[]
}

export const FactoryRightPanelContent: React.FC<FactoryRightPanelContentProps> = (
    {
        section, selectedComponent, assignMaterial, resetSelectedComponentsArray,
        setShowSimulationModel, availableMaterials, assignedMaterials
    }
) => {
    switch (section) {
        case 'Modeler' :
            return <SelectMaterial
                selectedComponent={selectedComponent}
                assignMaterial={assignMaterial}
                resetSelectedComponentsArray={resetSelectedComponentsArray}
                availableMaterials={availableMaterials}
            />

        case 'Physics' :
            return <></>
        case 'Simulator' :
            return (
                <>
                    <span className="py-1">Case Study</span>
                    <hr/>
                    {assignedMaterials.length > 0 ?
                            <button
                                className="btn button-primary flex-column"
                                onClick={() => setShowSimulationModel(true)}
                            >
                                <div className="fa fa-power-off me-3" style={{color: '#fff'}}/>
                                Launcher
                            </button>
                         : <h6>Add materials and physics <br/> and start the simulation</h6>
                    }
                </>
            )
        case 'Results' :
            return <></>
        default :
            return <></>
    }


}
import React from 'react';
import { ComponentEntity, Material } from "@Draco112358/cad-library";
import { SelectMaterial } from "./components/SelectMaterial";

interface FactoryRightPanelContentProps {
    section: string,
    selectedComponent: ComponentEntity[],
    // assignMaterial: Function,
    // resetSelectedComponentsArray: Function,
    setShowSimulationModel: Function,
    // availableMaterials: Material[],
    // assignedMaterials: Material[]
}

export const FactoryRightPanelContent: React.FC<FactoryRightPanelContentProps> = (
    {
        section, selectedComponent, setShowSimulationModel
    }
) => {
    switch (section) {
        case 'Modeler':
            return <></>

        case 'Physics':
            return <></>
        case 'Simulator':
            return (
                <>
                    <span className="py-1">Case Study</span>
                    <hr />
                    {selectedComponent.filter(component => component.material === undefined).length === 0 ?
                        <button
                            className="btn button-primary flex-column"
                            onClick={() => setShowSimulationModel(true)}
                        >
                            <div className="fa fa-power-off me-3" style={{ color: '#fff' }} />
                            Launcher
                        </button>
                        : <h6>Add materials and physics <br /> and start the simulation</h6>
                    }
                </>
            )
        case 'Results':
            return <></>
        default:
            return <></>
    }


}
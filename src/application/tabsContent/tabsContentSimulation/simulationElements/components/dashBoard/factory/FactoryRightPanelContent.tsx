import React from 'react';
import {ComponentEntity} from "@Draco112358/cad-library";
import {SelectMaterial} from "./components/SelectMaterial";

interface FactoryRightPanelContentProps {
    section: string,
    selectedComponent: ComponentEntity[],
    assignMaterial: Function,
    resetSelectedComponentsArray: Function
}

export const FactoryRightPanelContent: React.FC<FactoryRightPanelContentProps> = (
    {section, selectedComponent, assignMaterial, resetSelectedComponentsArray}
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
            return <></>
        case 'Results' :
            return <></>
        default : return <></>
    }


}
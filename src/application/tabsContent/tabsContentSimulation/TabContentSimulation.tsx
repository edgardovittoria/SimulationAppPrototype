import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    assignMaterial,
    importModel,
    resetSelectedComponents, selectComponent,
    selectedComponentSelector,
    selectedProjectSelector, unselectComponent, updateColorComponent
} from "../../../store/projectSlice";
import {MenuBar} from "../menuBar/MenuBar";
import {TabsContentSimulationFactory} from "./factory/TabsContentSimulationFactory";
import {ComponentEntity} from "@Draco112358/cad-library";
import {Material} from "../../../model/Material";

interface TabContentSimulationProps {
}

export const TabContentSimulation: React.FC<TabContentSimulationProps> = ({}) => {

    const dispatch = useDispatch()
    let selectedProject = useSelector(selectedProjectSelector)
    let selectedComponent = useSelector(selectedComponentSelector)

    const menuItems = ['Modeler', 'Physics', 'Simulator', 'Results']
    const [menuItemSelected, setMenuItemSelected] = useState(menuItems[0]);
    const [showSimulationModel, setShowSimulationModel] = useState(false);

    return(
        <>
            <MenuBar setMenuItem={setMenuItemSelected} menuItem={menuItemSelected} children={menuItems}/>
            <TabsContentSimulationFactory
                menuItem={menuItemSelected}
                selectedProject={selectedProject}
                importModel={importModel}
                selectedComponent={selectedComponent}
                selectComponent={(component: ComponentEntity) => dispatch(selectComponent(component))}
                unselectComponent={(component: ComponentEntity) => dispatch(unselectComponent(component))}
                assignMaterial={(material: {material: Omit<Material, 'associatedComponentKey'>, keyComponent: number}) => dispatch(assignMaterial(material))}
                resetSelectedComponentsArray={() => dispatch(resetSelectedComponents())}
                updateComponentColor={(obj: {keyComponent: number, color:string}) => dispatch(updateColorComponent(obj))}
                showSimulationModel={showSimulationModel}
                setShowSimulationModel={setShowSimulationModel}
            />
        </>
    )

}
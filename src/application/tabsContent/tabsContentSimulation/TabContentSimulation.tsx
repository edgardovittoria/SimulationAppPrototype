import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    assignMaterial, createSimulation,
    importModel,
    resetSelectedComponents, selectComponent,
    selectedComponentSelector,
    selectedProjectSelector, simulationSelector, unselectComponent, updateColorComponent, updateSimulation
} from "../../../store/projectSlice";
import {MenuBar} from "../menuBar/MenuBar";
import {TabsContentSimulationFactory} from "./factory/TabsContentSimulationFactory";
import {ComponentEntity} from "@Draco112358/cad-library";
import {Material} from "../../../model/Material";
import {useMaterials} from "./hooks/useMaterials";
import {useGenerateMesh} from "./hooks/useGenerateMesh";
import {useRunSimulation} from "./hooks/useRunSimulation";
import {Simulation} from "../../../model/Simulation";

interface TabContentSimulationProps {
}

export const TabContentSimulation: React.FC<TabContentSimulationProps> = ({}) => {

    const dispatch = useDispatch()
    let selectedProject = useSelector(selectedProjectSelector)
    let selectedComponent = useSelector(selectedComponentSelector)

    const menuItems = ['Modeler', 'Physics', 'Simulator', 'Results']
    const [menuItemSelected, setMenuItemSelected] = useState(menuItems[0]);
    const [showSimulationModel, setShowSimulationModel] = useState(false);

    const createNewSimulation = (newSimulation: Simulation) => {
        dispatch(createSimulation(newSimulation));
    }

    const updateTargetSimulation = (simulation: Simulation) => dispatch(updateSimulation(simulation))

    let simulations = useSelector(simulationSelector);


    let {availableMaterials} = useMaterials(); //hook to fetch materials,

    const {meshGenerated, setMeshGenerated} = useGenerateMesh(showSimulationModel);
    const {
        simulationStarted,
        meshApproved,
        setMeshApproved,
        newSimulation
    } = useRunSimulation(showSimulationModel, createNewSimulation, updateTargetSimulation,simulations as Simulation[]);

    let simulation = simulations?.filter(s => s.name === newSimulation.name)[0];


    return (
        <>
            <MenuBar setMenuItem={setMenuItemSelected} activeMenuItem={menuItemSelected} menuItems={menuItems}/>
            <TabsContentSimulationFactory
                menuItem={menuItemSelected}
                setMenuItem={setMenuItemSelected}
                selectedProject={selectedProject}
                importModel={importModel}
                selectedComponent={selectedComponent}
                selectComponent={(component: ComponentEntity) => dispatch(selectComponent(component))}
                unselectComponent={(component: ComponentEntity) => dispatch(unselectComponent(component))}
                assignMaterial={(material: { material: Omit<Material, 'associatedComponentKey'>, keyComponent: number }) => dispatch(assignMaterial(material))}
                resetSelectedComponentsArray={() => dispatch(resetSelectedComponents())}
                updateComponentColor={(obj: { keyComponent: number, color: string }) => dispatch(updateColorComponent(obj))}
                showSimulationModel={showSimulationModel}
                setShowSimulationModel={setShowSimulationModel}
                availableMaterials={availableMaterials}
                meshGenerated={meshGenerated}
                setMeshGenerated={setMeshGenerated}
                simulationStarted={simulationStarted}
                meshApproved={meshApproved}
                setMeshApproved={setMeshApproved}
                simulation={simulation}
            />
        </>
    )

}
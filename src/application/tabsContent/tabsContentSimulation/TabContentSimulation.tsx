import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    createSimulation,
    importModel,
    selectComponent,
    selectedComponentSelector,
    selectedProjectSelector, simulationSelector, unselectComponent, updateSimulation
} from "../../../store/projectSlice";
import {MenuBar} from "../menuBar/MenuBar";
import {TabsContentSimulationFactory} from "./factory/TabsContentSimulationFactory";
import {ComponentEntity} from "@Draco112358/cad-library";
import {useGenerateMesh} from "./hooks/useGenerateMesh";
import {useRunSimulation} from "./hooks/useRunSimulation";
import {Simulation} from "../../../model/Simulation";

interface TabContentSimulationProps {
    menuItems: string[],
    menuItemSelected: string,
    setMenuItemSelected: Function,
    selectedSimulation: Simulation | undefined,
    setSelectedSimulation: Function
}

export const TabContentSimulation: React.FC<TabContentSimulationProps> = (
    {
        menuItems, menuItemSelected, setMenuItemSelected, selectedSimulation,
        setSelectedSimulation
    }
) => {

    const dispatch = useDispatch()
    let selectedProject = useSelector(selectedProjectSelector)
    let selectedComponent = useSelector(selectedComponentSelector)

    const [showSimulationModel, setShowSimulationModel] = useState(false);

    const createNewSimulation = (newSimulation: Simulation) => {
        dispatch(createSimulation(newSimulation));
    }

    const updateTargetSimulation = (simulation: Simulation) => dispatch(updateSimulation(simulation))

    let simulations = useSelector(simulationSelector);


    const {meshGenerated, setMeshGenerated} = useGenerateMesh(showSimulationModel);
    const {
        simulationStarted,
        meshApproved,
        setMeshApproved,
        newSimulation
    } = useRunSimulation(showSimulationModel, createNewSimulation, updateTargetSimulation, simulations as Simulation[], selectedProject?.name as string);

    let simulation = simulations?.filter(s => s.name === newSimulation.name)[0]

    const [selectedTabLeftPanel, setSelectedTabLeftPanel] = useState("Modeler");

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
                // resetSelectedComponentsArray={() => dispatch(resetSelectedComponents())}
                showSimulationModel={showSimulationModel}
                setShowSimulationModel={setShowSimulationModel}
                meshGenerated={meshGenerated}
                setMeshGenerated={setMeshGenerated}
                simulationStarted={simulationStarted}
                meshApproved={meshApproved}
                setMeshApproved={setMeshApproved}
                selectedSimulation={selectedSimulation}
                setSelectedSimulation={setSelectedSimulation}
                simulation={simulation as Simulation}
                selectedTabLeftPanel={selectedTabLeftPanel}
                setSelectedTabLeftPanel={setSelectedTabLeftPanel}
            />
        </>
    )

}
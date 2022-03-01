import React from "react";
import {Project} from "../../../../../../../../model/Project";
import {ModelOutliner} from "../components/ModelOutliner";
import {ComponentEntity} from "@Draco112358/cad-library";
import {Materials} from "../components/Materials";
import {Physics} from "../components/Physics";
import {Simulator} from "../components/Simulator";
import {Results} from "../components/Results";
import {Modeler} from "../components/Modeler";
import {Simulation} from "../../../../../../../../model/Simulation";

interface FactorySimulationDashboardContentProps {
    selectedTab: string,
    selectedProject: Project | undefined,
    selectedComponent: ComponentEntity[],
    selectComponent: Function,
    unselectComponent: Function,
    // updateComponentColor: Function,
    setSelectedSimulation: Function,
    selectedSimulation: Simulation | undefined,
    selectPort: Function,
    deletePort: Function
}

export const FactorySimulationDashboardContent: React.FC<FactorySimulationDashboardContentProps> = (
    {
        selectedTab, selectedProject, selectedComponent, selectComponent,
        unselectComponent, setSelectedSimulation, selectedSimulation,selectPort, deletePort
    }
) => {
    switch (selectedTab) {
        case 'Materials' :
            return <Materials selectedProject={selectedProject}/>
        case 'Physics' :
            return <Physics selectedProject={selectedProject} selectPort={selectPort} deletePort={deletePort}/>
        case 'Simulator' :
            return <Simulator selectedProject={selectedProject}/>
        case 'Results' :
            return <Results selectedProject={selectedProject} setSelectedSimulation={setSelectedSimulation} selectedSimulation={selectedSimulation}/>
        default :
            return (
                <Modeler selectedProject={selectedProject}>
                    <ModelOutliner
                        selectedProject={selectedProject}
                        selectedComponent={selectedComponent}
                        selectComponent={selectComponent}
                        unselectComponent={unselectComponent}
                    />
                </Modeler>
            )

    }

}






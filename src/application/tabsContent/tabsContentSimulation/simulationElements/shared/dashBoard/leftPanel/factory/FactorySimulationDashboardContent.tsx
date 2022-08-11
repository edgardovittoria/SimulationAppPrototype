import React from "react";
import {Project} from "../../../../../../../../model/Project";
import {ModelOutliner} from "../components/ModelOutliner";
import {ComponentEntity} from "cad-library";
import {Materials} from "../components/Materials";
import {Physics} from "../components/Physics";
import {Simulator} from "../components/Simulator";
import {Results} from "../components/Results";
import {Modeler} from "../components/Modeler";
import {Simulation} from "../../../../../../../../model/Simulation";

interface FactorySimulationDashboardContentProps {
    selectedTab: string,
    setSelectedSimulation: Function,
    selectedSimulation: Simulation | undefined,
}

export const FactorySimulationDashboardContent: React.FC<FactorySimulationDashboardContentProps> = (
    {
        selectedTab, setSelectedSimulation, selectedSimulation
    }
) => {
    switch (selectedTab) {
        case 'Materials' :
            return <Materials/>
        case 'Physics' :
            return <Physics/>
        case 'Simulator' :
            return <Simulator/>
        case 'Results' :
            return <Results setSelectedSimulation={setSelectedSimulation} selectedSimulation={selectedSimulation}/>
        default :
            return (
                <Modeler>
                    <ModelOutliner/>
                </Modeler>
            )

    }

}






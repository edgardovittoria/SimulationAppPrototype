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
    selectedMaterials: string[],
    setSelectedMaterials: Function,
    chart: string,
    setChart: Function
}

export const FactorySimulationDashboardContent: React.FC<FactorySimulationDashboardContentProps> = (
    {
        selectedTab, setSelectedSimulation, selectedSimulation, selectedMaterials,
        setSelectedMaterials, chart, setChart
    }
) => {
    switch (selectedTab) {
        case 'Materials' :
            return <Materials/>
        case 'Physics' :
            return <Physics/>
        case 'Simulator' :
            return <Simulator selectedMaterials={selectedMaterials} setSelectedMaterials={setSelectedMaterials}/>
        case 'Results' :
            return <Results setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            chart={chart}
                            setChart={setChart}
            />
        default :
            return (
                <Modeler>
                    <ModelOutliner/>
                </Modeler>
            )

    }

}






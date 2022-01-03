import React from "react";
import {Project} from "../../model/Project";
import {ModelOutliner} from "../components/modeler/modeler";

interface FactorySimulationDashboardContentProps {
    selectedTab: string,
    selectedProject: Project | undefined
}

export const FactorySimulationDashboardContent: React.FC<FactorySimulationDashboardContentProps> = ({selectedTab, selectedProject}) => {
    switch (selectedTab) {
        case 'Materials' :
            return (
                <>
                    {/*TODO: check has to be done on the materials attribute and not on model*/}
                    {(selectedProject && selectedProject.materials !== "")
                        ? <div className="leftPanel modelContainer">
                            Materials
                        </div>
                        : <div className="leftPanel modelContainer">
                            <img src="/noMaterialsIcon.png" style={{marginTop: "100px"}}/>
                            <h5>No Materials assigned</h5>
                            <p style={{marginTop: "50px"}}>Select a part in the 3D View or the Model Tree and assign a
                                material to it from the Properties Panel.</p>
                        </div>
                    }
                </>
            )
        case 'Physics' :
            return (
                <>
                    {/*TODO: check has to be done on the materials attribute and not on model*/}
                    {(selectedProject && selectedProject.physics !== "")
                        ? <div className="leftPanel modelContainer">
                            Physics
                        </div>
                        : <div className="leftPanel modelContainer">
                            <img src="/noPhysicsIcon.png" style={{marginTop: "100px"}}/>
                            <h5>No Physics applied</h5>
                            <p style={{marginTop: "50px"}}>Select a tool from the Physics Toolbar and apply it to
                                geometry in the 3D View.</p>
                        </div>
                    }
                </>
            )
        case 'Simulator' :
            return (
                <>
                    {/*TODO: check has to be done on the materials attribute and not on model*/}
                    {(selectedProject && selectedProject.materials !== "" && selectedProject.physics !== "")
                        ? <div className="leftPanel modelContainer">
                            Simulator
                        </div>
                        : <div className="leftPanel modelContainer">
                            <img src="/noSimulationsIcon.png" style={{marginTop: "100px"}}/>
                            <h5>No Simulations</h5>
                            <p style={{marginTop: "50px"}}>Assign materials, apply physics, and start your first
                                simulation. </p>
                        </div>
                    }
                </>
            )
        case 'Results' :
            return (
                <>
                    {/*TODO: check has to be done on the materials attribute and not on model*/}
                    {(selectedProject && selectedProject.simulations.length > 0)
                        ? <div className="leftPanel modelContainer">
                            Results
                        </div>
                        : <div className="leftPanel modelContainer">
                            <img src="/noResultsIcon.png" style={{marginTop: "100px"}}/>
                            <h5>No results to view</h5>
                            <p style={{marginTop: "50px"}}>Complete a study setup with CAD, materials, and physics, then Estimate and Run to generate results.</p>
                        </div>
                    }
                </>
            )
        default :
            return (
                <>
                    {(selectedProject && selectedProject.model.components !== undefined)
                        ? <div className="leftPanel modelContainer">
                            <ModelOutliner/>
                        </div>
                        : <div className="leftPanel modelContainer">
                            <img src="/noModelsIcon.png" style={{marginTop: "100px"}}/>
                            <h5>No Model</h5>
                            <p style={{marginTop: "50px"}}>Use the icon from the Tool Bar <br/> to import a 3D CAD File.
                            </p>
                        </div>
                    }
                </>
            )

    }

}






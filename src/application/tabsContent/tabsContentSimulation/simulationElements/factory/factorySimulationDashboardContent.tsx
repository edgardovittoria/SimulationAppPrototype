import React from "react";
import {Project} from "../../../../../model/Project";
import {ModelOutliner} from "../components/dashBoard/leftPanel/components/modelOutliner/modelOutliner";
import {FaCircle} from "react-icons/fa";
import {ComponentEntity} from "@Draco112358/cad-library";

interface FactorySimulationDashboardContentProps {
    selectedTab: string,
    selectedProject: Project | undefined,
    selectedComponent: ComponentEntity[],
    selectComponent: Function,
    unselectComponent: Function,
    updateComponentColor: Function
}

export const FactorySimulationDashboardContent: React.FC<FactorySimulationDashboardContentProps> = (
    {
        selectedTab, selectedProject, selectedComponent, selectComponent,
        unselectComponent, updateComponentColor
    }
) => {
    switch (selectedTab) {
        case 'Materials' :
            return (
                <>
                    {(selectedProject && selectedProject.materials.length > 0)
                        ? <div className="leftPanel modelContainer py-4 h-auto">
                            <ul className="list-unstyled mb-0">
                            {selectedProject.materials.map((material, index) => {
                                return(
                                    <li key={index} className="mt-2">
                                        <div className="row">
                                            <div className="col-2 pe-0 ps-0">
                                                <FaCircle color={material.color} />
                                            </div>
                                            <div className="col-6 text-start ps-0">
                                                <h5 className="fw-normal mb-0">{material.name}</h5>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                            </ul>
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
                    {(selectedProject && selectedProject.materials.length > 0 && selectedProject.physics !== "")
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
                            <ModelOutliner
                                selectedProject={selectedProject}
                                selectedComponent={selectedComponent}
                                selectComponent={selectComponent}
                                unselectComponent={unselectComponent}
                                updateComponentColor={updateComponentColor}
                            />
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






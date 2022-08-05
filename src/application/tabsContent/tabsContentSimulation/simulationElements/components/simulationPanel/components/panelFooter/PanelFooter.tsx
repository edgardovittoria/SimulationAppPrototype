import React, {useState} from 'react';
import {ComponentEntity} from "cad-library";
import {Project} from "../../../../../../../../model/Project";

interface PanelFooterProps{
    simulationStarted: 'notStarted' | 'started' | 'Completed',
    meshGenerated: "Not Generated" | "Generating" | "Generated",
    meshApproved: boolean,
    setMeshGenerated: Function,
    setMeshApproved: Function,
    setMenuItem: Function,
    setShowSimulationModel: Function,
    quantumDimensions: [number, number, number],
    components: ComponentEntity[] | undefined,
    project: Project | undefined
}

export const PanelFooter: React.FC<PanelFooterProps> = (
    {
        simulationStarted, meshGenerated, setMeshGenerated, meshApproved,setMeshApproved,
        setMenuItem, setShowSimulationModel, quantumDimensions, components, project
    }
) => {

    const [mesherOutput, setMesherOutput] = useState(undefined);


    function checkQuantumDimensionsValidity(){
        let validity = true
        quantumDimensions.forEach(v => {
            if(v === 0){
                validity = false
            }
        })
        return validity
    }




    return(
        <div className="row w-100 my-0">
            <div className="col-7 border-end py-4">
                footer column 1
            </div>
            <div className="col-2 border-end py-4">
                footer column 2
            </div>
            <div className="col-3 py-4">
                <div className="flex-column">
                    {simulationStarted === 'started' &&
                    <div>
                        <div className="spinner spinner-border me-3"
                             style={{width: '20px', height: '20px'}}/>
                        <span className="fw-bold">Simulating...</span>
                    </div>
                    }
                    {(meshGenerated === "Not Generated") &&
                    <div>
                        <button
                            className="btn button-primary"
                            disabled={!checkQuantumDimensionsValidity()}
                            onClick={() => setMeshGenerated("Generating")}
                        >Generate Mesh
                        </button>
                    </div>}
                    {(meshGenerated === "Generating") &&
                        <div>
                            <div className="spinner spinner-border me-3"
                                 style={{width: '20px', height: '20px'}}/>
                            <span className="fw-bold">Generating Mesh</span>
                        </div>
                    }
                    {(meshGenerated === "Generated" && !meshApproved) &&
                    <div className="row">
                        <div className="col-6">
                            <button
                                className="btn button-primary"
                                disabled={!checkQuantumDimensionsValidity()}
                                onClick={() => setMeshGenerated("Generating")}
                            >Regenerate
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                className="btn button-primary"
                                onClick={() => setMeshApproved(true)}
                            >Start Simulation
                            </button>
                        </div>
                    </div>
                    }
                    {simulationStarted === 'Completed' &&
                    <button
                        className="btn button-primary"
                        onClick={() => {
                            setMenuItem('Results')
                            setShowSimulationModel(false)
                        }}
                    >Results</button>
                    }
                </div>
            </div>
        </div>
    )

}
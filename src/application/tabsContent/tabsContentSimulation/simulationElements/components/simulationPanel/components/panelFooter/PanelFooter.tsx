import React, {useState} from 'react';
import {ComponentEntity, meshFrom} from "cad-library";
import {STLExporter} from "three/examples/jsm/exporters/STLExporter";
import * as THREE from "three";
import {Object3D} from "three";



interface PanelFooterProps{
    simulationStarted: 'notStarted' | 'started' | 'Completed',
    meshGenerated: boolean,
    meshApproved: boolean,
    setMeshGenerated: Function,
    setMeshApproved: Function,
    setMenuItem: Function,
    setShowSimulationModel: Function,
    quantumDimensions: [number, number, number],
    components: ComponentEntity[] | undefined
}

export const PanelFooter: React.FC<PanelFooterProps> = (
    {
        simulationStarted, meshGenerated, setMeshGenerated, meshApproved,setMeshApproved,
        setMenuItem, setShowSimulationModel, quantumDimensions, components
    }
) => {

    const [meshGeneration, setMeshGeneration] = useState(false);


    function checkQuantumDimensionsValidity(){
        let validity = true
        quantumDimensions.forEach(v => {
            if(v === 0){
                validity = false
            }
        })
        return validity
    }

    function generateSTLListFromComponents(){
        let materialList: string[] = []
        components?.forEach(c => {
            if(c.material?.name && !materialList.includes(c.material?.name)){
                materialList.push(c.material?.name)
            }
        })
        let filteredComponents: ComponentEntity[][] = []

        materialList.forEach(m => {
            (components) && filteredComponents.push(components.filter(c => c.material?.name === m))
        })

        let STLList: string[] = []

        let exporter = new STLExporter();

        filteredComponents.forEach(fc => {
            let scene = new THREE.Scene()
            fc.forEach(c => {
                scene.add(meshFrom(c))
            })
            let STLToPush  = exporter.parse(scene).replace("exported", fc[0].material?.name as string)
            STLList.push(STLToPush)
        })

        return STLList
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
                    {(!meshGeneration && !meshGenerated) &&
                    <div>
                        <button
                            className="btn button-primary"
                            disabled={!checkQuantumDimensionsValidity()}
                            onClick={() => {
                                setMeshGeneration(true)
                                //TODO: add http request to generate mesh
                                let objToSendToMesher = {
                                    STLList: generateSTLListFromComponents(),
                                    quantum: quantumDimensions
                                }

                                console.log(objToSendToMesher)
                                setTimeout(() => {
                                    setMeshGeneration(false)
                                    setMeshGenerated(true)
                                }, 5000)
                            }}
                        >Generate Mesh
                        </button>
                    </div>}
                    {(meshGeneration) &&
                        <div>
                            <div className="spinner spinner-border me-3"
                                 style={{width: '20px', height: '20px'}}/>
                            <span className="fw-bold">Generating Mesh</span>
                        </div>
                    }
                    {(meshGenerated && !meshApproved) &&
                    <div className="row">
                        <div className="col-6">
                            <button
                                className="btn button-primary"
                                disabled={!checkQuantumDimensionsValidity()}
                                onClick={() => {
                                    setMeshGeneration(true)
                                    setMeshGenerated(false)
                                    //TODO: add http request to generate mesh
                                    let objToSendToMesher = {
                                        STLList: generateSTLListFromComponents(),
                                        quantum: quantumDimensions
                                    }

                                    console.log(objToSendToMesher)
                                    setTimeout(() => {
                                        setMeshGeneration(false)
                                        setMeshGenerated(true)
                                    }, 5000)
                                }}
                            >Regenerate
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                className="btn button-primary"
                                onClick={() => {
                                    setMeshApproved(true)
                                }}
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
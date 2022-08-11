import React from 'react';
import {Canvas} from "@react-three/fiber";
import * as THREE from "three";
import {OrbitControls} from "@react-three/drei";
import {Simulation} from "../../../../../../../../model/Simulation";
import {FactoryShapes} from "cad-library";
import {Project} from "../../../../../../../../model/Project";
import css
    from "../../../../shared/dashBoard/rightPanelSimulation/factory/components/portManagement/components/portPosition/portPosition.module.css";
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";

interface PanelContentProps {
    simulationStarted: 'notStarted' | 'started' | 'Completed',
    meshGenerated: "Not Generated" | "Generating" | "Generated",
    simulation: Simulation,
    setQuantumDimensions: Function,
    quantumDimensions: [number, number, number]
}

export const PanelContent: React.FC<PanelContentProps> = (
    {
        simulationStarted, meshGenerated, simulation,
        setQuantumDimensions, quantumDimensions
    }
) => {

    const selectedProject = useSelector(selectedProjectSelector)

    return (
        <div className="col-9 simulationPanelContent p-4">
            <div className="row">
                <div className="col-6">Name</div>
                <div className="col-6">Status</div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-6 fw-bold">{(simulation) && simulation.name}</div>
                <div className="col-6">
                    {simulationStarted === 'started' && 'Started'}
                    {simulationStarted === 'notStarted' && 'Not Started'}
                    {simulationStarted === 'Completed' && 'Completed'}
                </div>
            </div>
            <div className="row mt-5 mb-5">
                <div>
                    <div className="mt-2">
                        <span>Set quantum's dimensions</span>
                        <div className="row mt-2">
                            <div className="col-4 text-center">
                                <span>X</span>
                                <input
                                    min={0}
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.000001}
                                    value={quantumDimensions[0]}
                                    onChange={(event) => setQuantumDimensions([parseFloat(event.target.value), quantumDimensions[1], quantumDimensions[2]])}
                                />
                            </div>
                            <div className="col-4 text-center">
                                <span>Y</span>
                                <input
                                    min={0.000000}
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.000001}
                                    value={quantumDimensions[1]}
                                    onChange={(event) => setQuantumDimensions([quantumDimensions[0], parseFloat(event.target.value), quantumDimensions[2]])}
                                />
                            </div>
                            <div className="col-4 text-center">
                                <span>Z</span>
                                <input
                                    min={0}
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.000001}
                                    value={quantumDimensions[2]}
                                    onChange={(event) => setQuantumDimensions([quantumDimensions[0], quantumDimensions[1], parseFloat(event.target.value)])}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                {(meshGenerated === "Generated" && simulationStarted !== 'started') &&
                <Canvas style={{height: "400px"}}>
                    <pointLight position={[100, 100, 100]} intensity={0.8}/>
                    <hemisphereLight color={'#3a3a3a'}  position={[0, 25, 13]} intensity={0.6}/>
                    {/*TODO: show mesh that return the server*/}
                    {selectedProject && selectedProject.model.components.map(component => {
                        return (
                            <mesh
                                key={component.keyComponent}
                                onUpdate={(mesh) => {
                                    mesh.material = new THREE.MeshPhongMaterial({
                                        color: component.material?.color,
                                        //wireframe: true
                                    })
                                }}
                                position={component.transformationParams.position}
                                scale={component.transformationParams.scale}
                                rotation={component.transformationParams.rotation}
                            >
                                <FactoryShapes entity={component}/>
                            </mesh>
                        )
                    })}
                    <OrbitControls/>
                </Canvas>
                }
            </div>
        </div>
    )

}
import React, {useEffect, useState} from 'react';
import {Canvas} from "@react-three/fiber";
import {GizmoHelper, GizmoViewport, OrbitControls, TransformControls} from "@react-three/drei";
import {Simulation} from "../../../../../../../../model/Simulation";
import {Material} from "cad-library";
import css
    from "../../../../shared/dashBoard/rightPanelSimulation/factory/components/portManagement/components/portPosition/portPosition.module.css";
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";
import {MesherOutput} from "../../../../../../../../model/MesherInputOutput";
import {MyInstancedMesh} from "./components/MyInstancedMesh";

interface PanelContentProps {
    simulationStarted: 'notStarted' | 'started' | 'Completed',
    meshGenerated: "Not Generated" | "Generating" | "Generated",
    simulation: Simulation,
    setQuantumDimensions: Function,
    quantumDimensions: [number, number, number],
    mesherOutput: MesherOutput | undefined
}

export const PanelContent: React.FC<PanelContentProps> = (
    {
        simulationStarted, meshGenerated, simulation,
        setQuantumDimensions, quantumDimensions, mesherOutput
    }
) => {

    const selectedProject = useSelector(selectedProjectSelector)

    let materialsList: Material[] = []
    selectedProject?.model?.components.forEach(c => materialsList.push(c.material as Material))

    const [mesherMatrices, setMesherMatrices] = useState<boolean[][][][]>([]);
    const [numberOfCells, setNumberOfCells] = useState<number[]>([]);



    useEffect(() => {
        if (mesherOutput) {
            let matrices: boolean[][][][] = []
            Object.values(mesherOutput.mesher_matrices).forEach(matrix => {
                matrices.push(matrix)
            })
            setMesherMatrices(matrices)
            setQuantumDimensions([
                mesherOutput.cell_size.cell_size_x,
                mesherOutput.cell_size.cell_size_y,
                mesherOutput.cell_size.cell_size_z
            ])
            let cellsNumber: number[] = []
            mesherMatrices.forEach(matrix => {
                let cells = 0
                matrix.forEach(m => {
                    m.forEach(m => {
                        m.forEach(m => {
                            if (m) {
                                cells += 1
                            }
                        })
                    })
                })
                cellsNumber.push(cells)
            })
            setNumberOfCells(cellsNumber)
        }
    }, [mesherOutput, meshGenerated]);


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
                    <Canvas style={{height: "500px"}}>
                        <pointLight position={[100, 100, 100]} intensity={0.8}/>
                        <hemisphereLight color={'#3a3a3a'} position={[0, 25, 13]} intensity={0.6}/>
                        {/*TODO: show mesh that return the server*/}
                        <TransformControls>
                            <group>
                                {mesherOutput && mesherMatrices.map((matrix, index) => {
                                    if (numberOfCells[index] > 0) {
                                        return (
                                            <MyInstancedMesh
                                                mesherOutput={mesherOutput}
                                                mesherMatrices={mesherMatrices}
                                                index={index}
                                                numberOfCells={numberOfCells}
                                                materialsList={materialsList}
                                            />
                                        )
                                    }
                                })}
                            </group>
                        </TransformControls>
                        <OrbitControls makeDefault/>
                        <GizmoHelper alignment="bottom-right" margin={[150, 80]}>
                            <GizmoViewport axisColors={['red', '#40ff00', 'blue']} labelColor="white"/>
                        </GizmoHelper>
                    </Canvas>
                }
            </div>
        </div>
    )

}
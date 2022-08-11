import React from 'react';
import {Port, Probe} from "../../../../../../../../../../../../model/Port";

import css from "./portPosition.module.css";
import {useDispatch} from "react-redux";
import {updatePortPosition} from "../../../../../../../../../../../../store/projectSlice";

interface PortPositionProps {
    selectedPort : Port | Probe,
}

export const PortPosition: React.FC<PortPositionProps> = ({selectedPort}) => {

    const dispatch = useDispatch()

    return(
        <>
            {(selectedPort.category === 'port' || selectedPort.category === 'lumped') ?
                <div className={`mt-3 ${css.portPositionBox}`}>
                    <h6>Port Position</h6>
                    <div className="mt-2">
                        <span>Input (X,Y,Z)</span>
                        <div className="row mt-2">
                            <div className="col-4">
                                <input
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.1}
                                    value={selectedPort.inputElement.transformationParams.position[0].toFixed(6)}
                                    onChange={(event) => {
                                        let newPosition = [
                                            parseFloat(event.currentTarget.value),
                                            selectedPort.inputElement.transformationParams.position[1],
                                            selectedPort.inputElement.transformationParams.position[2]
                                        ]
                                        dispatch(updatePortPosition({type: 'first', position: newPosition as [number, number, number]}))
                                    }}
                                />
                            </div>
                            <div className="col-4">
                                <input
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.1}
                                    value={selectedPort.inputElement.transformationParams.position[1].toFixed(6)}
                                    onChange={(event) => {
                                        let newPosition = [
                                            selectedPort.inputElement.transformationParams.position[0],
                                            parseFloat(event.currentTarget.value),
                                            selectedPort.inputElement.transformationParams.position[2]
                                        ]
                                        dispatch(updatePortPosition({type: 'first', position: newPosition as [number, number, number]}))
                                    }}
                                />
                            </div>
                            <div className="col-4">
                                <input
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.1}
                                    value={selectedPort.inputElement.transformationParams.position[2].toFixed(6)}
                                    onChange={(event) => {
                                        let newPosition = [
                                            selectedPort.inputElement.transformationParams.position[0],
                                            selectedPort.inputElement.transformationParams.position[1],
                                            parseFloat(event.currentTarget.value)
                                        ]
                                        dispatch(updatePortPosition({type: 'first', position: newPosition as [number, number, number]}))
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mt-2">
                        <span>Output (X,Y,Z)</span>
                        <div className="row mt-2">
                            <div className="col-4">
                                <input
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.1}
                                    value={selectedPort.outputElement.transformationParams.position[0].toFixed(6)}
                                    onChange={(event) => {
                                        let newPosition = [
                                            parseFloat(event.currentTarget.value),
                                            selectedPort.outputElement.transformationParams.position[1],
                                            selectedPort.outputElement.transformationParams.position[2]
                                        ]
                                        dispatch(updatePortPosition({type: 'last', position: newPosition as [number, number, number]}))
                                    }}
                                />
                            </div>
                            <div className="col-4">
                                <input
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.1}
                                    value={selectedPort.outputElement.transformationParams.position[1].toFixed(6)}
                                    onChange={(event) => {
                                        let newPosition = [
                                            selectedPort.outputElement.transformationParams.position[0],
                                            parseFloat(event.currentTarget.value),
                                            selectedPort.outputElement.transformationParams.position[2]
                                        ]
                                        dispatch(updatePortPosition({type: 'last', position: newPosition as [number, number, number]}))
                                    }}
                                />
                            </div>
                            <div className="col-4">
                                <input
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.1}
                                    value={selectedPort.outputElement.transformationParams.position[2].toFixed(6)}
                                    onChange={(event) => {
                                        let newPosition = [
                                            selectedPort.outputElement.transformationParams.position[0],
                                            selectedPort.outputElement.transformationParams.position[1],
                                            parseFloat(event.currentTarget.value)
                                        ]
                                        dispatch(updatePortPosition({type: 'last', position: newPosition as [number, number, number]}))
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={`mt-3 ${css.portPositionBox}`}>
                    <h6>Probe Position</h6>
                    <div className="mt-2">
                        <span>Position (X,Y,Z)</span>
                        <div className="row mt-2">
                            <div className="col-4">
                                <input
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.1}
                                    value={(selectedPort as Probe).groupPosition[0].toFixed(6)}
                                    onChange={(event) => {
                                        let newPosition = [
                                            parseFloat(event.currentTarget.value),
                                            (selectedPort as Probe).groupPosition[1],
                                            (selectedPort as Probe).groupPosition[2]
                                        ]
                                        dispatch(updatePortPosition({type: 'probe', position: newPosition as [number, number, number]}))
                                    }}
                                />
                            </div>
                            <div className="col-4">
                                <input
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.1}
                                    value={(selectedPort as Probe).groupPosition[1].toFixed(6)}
                                    onChange={(event) => {
                                        let newPosition = [
                                            (selectedPort as Probe).groupPosition[0],
                                            parseFloat(event.currentTarget.value),
                                            (selectedPort as Probe).groupPosition[2]
                                        ]
                                        dispatch(updatePortPosition({type: 'probe', position: newPosition as [number, number, number]}))
                                    }}
                                />
                            </div>
                            <div className="col-4">
                                <input
                                    className={`w-100 ${css.inputPortManagement} form-control`}
                                    type="number"
                                    step={.1}
                                    value={(selectedPort as Probe).groupPosition[2].toFixed(6)}
                                    onChange={(event) => {
                                        let newPosition = [
                                            (selectedPort as Probe).groupPosition[0],
                                            (selectedPort as Probe).groupPosition[1],
                                            parseFloat(event.currentTarget.value)
                                        ]
                                        dispatch(updatePortPosition({type: 'probe', position: newPosition as [number, number, number]}))
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )

}
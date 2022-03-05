import React from 'react';
import {Port} from "../../../../../../../../../../../model/Project";

interface PortPositionProps {
    selectedPort : Port,
    updatePortPosition: Function
}

export const PortPosition: React.FC<PortPositionProps> = ({selectedPort, updatePortPosition}) => {
    return(
        <div className="mt-3 portPositionBox">
            <h6>Port Position</h6>
            <div className="mt-2">
                <span>Input (X,Y,Z)</span>
                <div className="row mt-2">
                    <div className="col-4">
                        <input
                            className="w-100 inputPortManagement form-control"
                            type="number"
                            step={.1}
                            value={selectedPort.inputElement.transformationParams.position[0]}
                            onChange={(event) => {
                                let newPosition = [
                                    parseFloat(event.currentTarget.value),
                                    selectedPort.inputElement.transformationParams.position[1],
                                    selectedPort.inputElement.transformationParams.position[2]
                                ]
                                updatePortPosition({type: 'first', position: newPosition})
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="w-100 inputPortManagement form-control"
                            type="number"
                            step={.1}
                            value={selectedPort.inputElement.transformationParams.position[1]}
                            onChange={(event) => {
                                let newPosition = [
                                    selectedPort.inputElement.transformationParams.position[0],
                                    parseFloat(event.currentTarget.value),
                                    selectedPort.inputElement.transformationParams.position[2]
                                ]
                                updatePortPosition({type: 'first', position: newPosition})
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="w-100 inputPortManagement form-control"
                            type="number"
                            step={.1}
                            value={selectedPort.inputElement.transformationParams.position[2]}
                            onChange={(event) => {
                                let newPosition = [
                                    selectedPort.inputElement.transformationParams.position[0],
                                    selectedPort.inputElement.transformationParams.position[1],
                                    parseFloat(event.currentTarget.value)
                                ]
                                updatePortPosition({type: 'first', position: newPosition})
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
                            className="w-100 inputPortManagement form-control"
                            type="number"
                            step={.1}
                            value={selectedPort.outputElement.transformationParams.position[0]}
                            onChange={(event) => {
                                let newPosition = [
                                    parseFloat(event.currentTarget.value),
                                    selectedPort.outputElement.transformationParams.position[1],
                                    selectedPort.outputElement.transformationParams.position[2]
                                ]
                                updatePortPosition({type: 'last', position: newPosition})
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="w-100 inputPortManagement form-control"
                            type="number"
                            step={.1}
                            value={selectedPort.outputElement.transformationParams.position[1]}
                            onChange={(event) => {
                                let newPosition = [
                                    selectedPort.outputElement.transformationParams.position[0],
                                    parseFloat(event.currentTarget.value),
                                    selectedPort.outputElement.transformationParams.position[2]
                                ]
                                updatePortPosition({type: 'last', position: newPosition})
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="w-100 inputPortManagement form-control"
                            type="number"
                            step={.1}
                            value={selectedPort.outputElement.transformationParams.position[2]}
                            onChange={(event) => {
                                let newPosition = [
                                    selectedPort.outputElement.transformationParams.position[0],
                                    selectedPort.outputElement.transformationParams.position[1],
                                    parseFloat(event.currentTarget.value)
                                ]
                                updatePortPosition({type: 'last', position: newPosition})
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}
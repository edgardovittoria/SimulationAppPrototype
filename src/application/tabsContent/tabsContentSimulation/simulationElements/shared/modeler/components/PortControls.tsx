import {Port} from "../../../../../../../model/Port";
import React, {FC, useEffect, useRef} from "react";
import {Object3DNode, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {TransformControls} from "@react-three/drei";

interface PortControlsProps {
    selectedPort: Port | undefined,
    selectPort: Function,
    updatePortPosition: Function
}

export const PortControls: FC<PortControlsProps> = (
    {
        selectedPort, selectPort, updatePortPosition
    }
) => {

    const transformationFirst = useRef(null);
    const transformationLast = useRef(null);
    const { scene } = useThree()

    useEffect(() => {
        if (transformationFirst.current) {
            const controls = transformationFirst.current as unknown as Object3DNode<any, any>;
            controls.addEventListener("dragging-changed", onChangeFirstPositionHandler)
            return () => controls.removeEventListener("dragging-changed", onChangeFirstPositionHandler)
        }
    })

    useEffect(() => {
        if (transformationLast.current) {
            const controls = transformationLast.current as unknown as Object3DNode<any, any>;
            controls.addEventListener("dragging-changed", onChangeLastPositionHandler)
            return () => controls.removeEventListener("dragging-changed", onChangeLastPositionHandler)
        }

    })


    function onChangeFirstPositionHandler(event: THREE.Event) {
        if (!event.value && transformationFirst.current) {
            const controls: Object3DNode<any, any> = transformationFirst.current as unknown as Object3DNode<any, any>
            let transformationParmas = {
                type: 'first',
                position: [controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z],
            }
            updatePortPosition(transformationParmas)
        }
    }

    function onChangeLastPositionHandler(event: THREE.Event) {
        if (!event.value && transformationLast.current) {
            const controls: Object3DNode<any, any> = transformationLast.current as unknown as Object3DNode<any, any>
            let transformationParmas = {
                type: 'last',
                position: [controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z],
            }
            updatePortPosition(transformationParmas)
        }
    }



    return (
        <>
            <TransformControls
                object={(selectedPort) && scene.getObjectByName((selectedPort as Port).inputElement.name)}
                ref={transformationFirst}
                position={(selectedPort) && (selectedPort as Port).inputElement.transformationParams.position}
                showX={(selectedPort) ? (selectedPort as Port).isSelected : false}
                showY={(selectedPort) ? (selectedPort as Port).isSelected : false}
                showZ={(selectedPort) ? (selectedPort as Port).isSelected : false}
            />
            <TransformControls
                object={(selectedPort) && scene.getObjectByName((selectedPort as Port).outputElement.name)}
                ref={transformationLast}
                position={(selectedPort) && (selectedPort as Port).outputElement.transformationParams.position}
                showX={(selectedPort) ? (selectedPort as Port).isSelected : false}
                showY={(selectedPort) ? (selectedPort as Port).isSelected : false}
                showZ={(selectedPort) ? (selectedPort as Port).isSelected : false}
            />
        </>
    )


}

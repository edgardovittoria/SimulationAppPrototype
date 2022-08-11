import React from 'react';
import {Project} from "../../../../../../../../model/Project";
import {AiOutlineThunderbolt} from "react-icons/ai";
import css from "./style/physics.module.css"
import {IoTrashOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {deletePort, selectedProjectSelector, selectPort} from "../../../../../../../../store/projectSlice";

interface PhysicsProps {
}

export const Physics: React.FC<PhysicsProps> = ({}) => {

    const dispatch = useDispatch()
    const selectedProject = useSelector(selectedProjectSelector)

    return (
        <>
            {(selectedProject && selectedProject.ports.length !== 0)
                ?
                <div className={`${css.leftPanel} ${css.modelContainer} py-4 h-auto`}>
                    <ul className="list-unstyled mb-0">
                        {selectedProject.ports && selectedProject.ports.map((port) => {
                            let portColor = 'orange';
                            if(port.category === 'lumped'){
                                portColor = 'violet'
                            }else if(port.category === 'port'){
                                portColor = 'red'
                            }
                            return (
                                <li key={port.name}
                                    className={port.isSelected ? `${css.listItemPort} ${css.listItemPortSelected}` : css.listItemPort}
                                    onClick={() => dispatch(selectPort(port.name))}
                                >
                                    <div className="row">
                                        <div className="col-2 pe-0 ps-0">
                                            <AiOutlineThunderbolt color={portColor}
                                                                  style={{width: "25px", height: "25px"}}/>
                                        </div>
                                        <div className="col-8 text-start ps-0">
                                            <h5 className="fw-normal mb-0">{port.name}</h5>
                                        </div>
                                        {port.isSelected &&
                                            <div
                                                className="col-2 pe-0 ps-0"
                                                onClick={() => dispatch(deletePort(port.name))}
                                            >
                                                <IoTrashOutline color={'#d80233'} style={{width: "20px", height: "20px"}}/>
                                            </div>
                                        }
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                : <div className={`${css.leftPanel} ${css.modelContainer}`}>
                    <img src="/noPhysicsIcon.png" className={css.noPhysicsIcon}/>
                    <h5>No Physics applied</h5>
                    <p className={css.noPhysicsText}>Select a tool from the Physics Toolbar and apply it to
                        geometry in the 3D View.</p>
                </div>
            }
        </>
    )

}
import React from 'react';
import {Project} from "../../../../../../../../model/Project";

import css from "./style/simulator.module.css";

interface SimulatorProps {
    selectedProject: Project | undefined
}

export const Simulator: React.FC<SimulatorProps> = ({selectedProject}) => {
    return(
        <>
            {(selectedProject && selectedProject.model.components.filter(comp => comp.material !== undefined).length > 0 && selectedProject.ports.length !== 0)
                ? <div className={`${css.leftPanel} ${css.modelContainer}`}>
                    Simulator
                </div>
                : <div className={`${css.leftPanel} ${css.modelContainer}`}>
                    <img src="/noSimulationsIcon.png" className={css.noSimulationIcon}/>
                    <h5>No Simulations</h5>
                    <p className={css.noSimulationText}>Assign materials, apply physics, and start your first
                        simulation. </p>
                </div>
            }
        </>
    )

}
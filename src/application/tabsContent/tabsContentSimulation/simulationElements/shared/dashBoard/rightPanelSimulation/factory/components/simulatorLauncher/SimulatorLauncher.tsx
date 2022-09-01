import React from 'react';
import {ComponentEntity} from "cad-library";

import css from "./simulatorLauncher.module.css";

interface SimulatorLauncherProps {
    components: ComponentEntity[] | undefined,
    setShowSimulationModel: Function,
    setMeshGenerated: Function
}

export const SimulatorLauncher: React.FC<SimulatorLauncherProps> = ({components, setShowSimulationModel, setMeshGenerated}) => {
    return(
        <div className={css.simulatorLauncherContainer}>
            <span className="py-1">Case Study</span>
            <hr/>
            {((components !== undefined) && (components.filter(component => component.material === undefined).length === 0)) ?
                <button
                    className="button buttonPrimary flex-col w-[100%]"
                    onClick={() => {
                        setMeshGenerated("Not Generated")
                        setShowSimulationModel(true)
                    }}
                >
                    <div className="fa fa-power-off me-3" style={{color: '#fff'}}/>
                    Launcher
                </button>
                : <h6>Add materials and physics <br/> and start the simulation</h6>
            }
        </div>
    )

}
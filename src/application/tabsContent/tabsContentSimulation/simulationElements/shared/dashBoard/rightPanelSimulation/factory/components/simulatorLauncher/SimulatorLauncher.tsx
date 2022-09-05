import React from 'react';
import {ComponentEntity} from "cad-library";
import {useDispatch} from "react-redux";
import {setMeshGenerated} from "../../../../../../../../../../store/mesherSlice";

interface SimulatorLauncherProps {
    components: ComponentEntity[] | undefined,
    setMenuItem: Function
}

export const SimulatorLauncher: React.FC<SimulatorLauncherProps> = (
    {
        components, setMenuItem
    }
) => {

    const dispatch = useDispatch()

    return(
        <div className="absolute right-[2%] top-[160px] w-[22%] rounded-xl bg-white p-[20px] shadow-2xl">
            <span className="py-1">Case Study</span>
            <hr/>
            {((components !== undefined) && (components.filter(component => component.material === undefined).length === 0)) ?
                <button
                    className="button buttonPrimary flex-col w-[100%]"
                    onClick={() => {
                        dispatch(setMeshGenerated("Not Generated"))
                        setMenuItem('Mesher')
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
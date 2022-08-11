import {Project} from "../../../../../../../../model/Project";
import {ComponentEntity} from "cad-library";
import React from "react";
import {FaCube, FaCubes} from "react-icons/fa";

import css from "./style/modelOutliner.module.css";
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";

interface ModelOutlinerProps {

}

export const ModelOutliner: React.FC<ModelOutlinerProps> = ({}) => {

    //TODO: remove selection of componenst

    const selectedProject = useSelector(selectedProjectSelector)

    return (
        <>
            <div className='col mt-4'>
                <div className="row ps-2">
                    <div className="col-2">
                        <FaCubes className={css.outlineGroupIcon}/>
                    </div>
                    <div className="col-10 text-start ps-0">
                        <h5 className={css.outlineGroupTitle}>Components</h5>
                    </div>
                </div>
                <div className="row p-1 ps-5">
                    {selectedProject && selectedProject.model.components.map(component => {
                        return (
                            <div
                                className={`row ${css.rowElements}`}
                                key={component.keyComponent}
                            >
                                <div className="col-2">
                                    <FaCube className={css.outlineComponentIcon} color={(component.material !== undefined) ? component.material.color : "gray"}/>
                                </div>
                                <div className="col-10 text-start ps-0">
                                    <h6 className={`${css.outlineGroupTitle} text-lowercase`}>{component.name}</h6>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )

}
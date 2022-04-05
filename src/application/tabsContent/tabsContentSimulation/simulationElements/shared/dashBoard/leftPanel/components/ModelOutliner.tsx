import {Project} from "../../../../../../../../model/Project";
import {ComponentEntity} from "cad-library";
import React from "react";
import {FaCube, FaCubes} from "react-icons/fa";

import css from "./style/modelOutliner.module.css";

interface ModelOutlinerProps {
    selectedProject: Project | undefined,
    selectedComponent: ComponentEntity[],
    selectComponent: Function,
    unselectComponent: Function,
}

export const ModelOutliner: React.FC<ModelOutlinerProps> = (
    {selectedProject, selectedComponent, selectComponent, unselectComponent}) => {

    //TODO: remove selection of componenst

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
                                className={(selectedComponent.filter(c => c.keyComponent === component.keyComponent).length > 0) ? `row ${css.rowElements} ${css.rowActive}` : `row ${css.rowElements}`}
                                key={component.keyComponent}
                                /*onClick={() => {
                                    if (selectedComponent.filter(c => c.keyComponent === component.keyComponent).length > 0) {
                                        unselectComponent(component)
                                    } else {
                                        selectComponent(component);
                                    }
                                }}*/
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
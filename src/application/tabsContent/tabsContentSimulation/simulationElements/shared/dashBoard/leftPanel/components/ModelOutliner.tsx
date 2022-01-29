import {Project} from "../../../../../../../../model/Project";
import {ComponentEntity} from "@Draco112358/cad-library";
import React, {useState} from "react";
import {FaCube, FaCubes} from "react-icons/fa";

interface ModelOutlinerProps {
    selectedProject: Project | undefined,
    selectedComponent: ComponentEntity[],
    selectComponent: Function,
    unselectComponent: Function,
    updateComponentColor: Function,
}

export const ModelOutliner: React.FC<ModelOutlinerProps> = (
    {selectedProject, selectedComponent, selectComponent, unselectComponent, updateComponentColor}) => {

    const [colorOfNotSelectedComponent, setColorOfNotSelectedComponent] = useState<{key: number, color: string}[]>([]);

    return (
        <>
            <div className='col mt-4'>
                <div className="row ps-2">
                    <div className="col-2">
                        <FaCubes className="outlinerGroupIcon"/>
                    </div>
                    <div className="col-10 text-start ps-0">
                        <h5 className="outlinerGroupTitle">Components</h5>
                    </div>
                </div>
                <div className="row p-1 ps-5">
                    {selectedProject && selectedProject.model.components.map(component => {
                        return (
                            <div
                                className={(selectedComponent.filter(c => c.keyComponent === component.keyComponent).length > 0) ? 'row rowElements rowActive' : 'row rowElements '}
                                key={component.keyComponent}
                                onClick={() => {
                                    if (selectedComponent.filter(c => c.keyComponent === component.keyComponent).length > 0) {
                                        unselectComponent(component)
                                        updateComponentColor({keyComponent: component.keyComponent, color: colorOfNotSelectedComponent.filter(c => c.key === component.keyComponent)[0].color})
                                    } else {
                                        setColorOfNotSelectedComponent([...colorOfNotSelectedComponent, {key: component.keyComponent, color: component.color}])
                                        selectComponent(component);
                                        updateComponentColor({keyComponent: component.keyComponent, color: '#1302fb'})
                                    }
                                }}
                            >
                                <div className="col-2">
                                    <FaCube className="outlinerComponentIcon" color={component.color}/>
                                </div>
                                <div className="col-10 text-start ps-0">
                                    <h6 className="outlinerGroupTitle text-lowercase">{component.name}</h6>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )

}
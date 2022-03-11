import React, {useRef, useState} from 'react';
import {BiExport, BiTrash} from "react-icons/bi";
import css from "./projectManagementIcon.module.css";
import {exportSimulationProject} from "../../../../../importExport/exportFunctions";
import {Overlay, Tooltip} from "react-bootstrap";
import {Project} from "../../../../../model/Project";

interface ProjectManagementIconsProps {
    project: Project,
    removeProject: Function,
    projectsTab: Project[],
    setProjectsTab: Function
}

export const ProjectManagementIcons: React.FC<ProjectManagementIconsProps> = (
    {
        project, removeProject, projectsTab, setProjectsTab
    }
) => {

    const exportIcon = useRef(null);
    const deleteIcon = useRef(null);
    const [showExport, setShowExport] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    return(
        <div className="row">
            <div ref={exportIcon}
                 onMouseOver={() => setShowExport(true)}
                 onMouseOut={() => setShowExport(false)}
                 className="col-2">
                <BiExport
                    className={css.exportIcon}
                    color={'#1C494D'}
                    size="20px"
                    onClick={() => exportSimulationProject(project)}
                />
                <Overlay target={exportIcon.current} show={showExport} placement="top">
                    {(props) => (
                        <Tooltip {...props}>
                            Export Project
                        </Tooltip>
                    )}
                </Overlay>
            </div>
            <div ref={deleteIcon}
                 onMouseOver={() => setShowDelete(true)}
                 onMouseOut={() => setShowDelete(false)}
                 className="col-2">
                <BiTrash
                    className={css.deleteIcon}
                    color="red"
                    size="20px"
                    onClick={() => {
                        removeProject(project.name)
                        setProjectsTab(projectsTab.filter(p => p.name !== project.name))
                    }}
                />
                <Overlay target={deleteIcon.current} show={showDelete} placement="top">
                    {(props) => (
                        <Tooltip {...props}>
                            Delete Project
                        </Tooltip>
                    )}
                </Overlay>
            </div>
        </div>
    )

}
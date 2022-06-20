import React, {useRef, useState} from 'react';
import {BiExport, BiShareAlt, BiTrash} from "react-icons/bi";
import css from "./projectManagementIcon.module.css";
import {exportSimulationProject} from "../../../../../importExport/exportFunctions";
import {Overlay, Tooltip} from "react-bootstrap";
import {Project} from "../../../../../model/Project";
import {updateFolderOrProject} from "../../../../../faunadb/api/projectsFolderAPIs";
import {store} from "../../../../../store/store";

interface ProjectManagementIconsProps {
    project: Project,
    removeProject: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    execQuery: Function
}

export const ProjectManagementIcons: React.FC<ProjectManagementIconsProps> = (
    {
        project, removeProject, projectsTab, setProjectsTab, execQuery
    }
) => {

    const exportIcon = useRef(null);
    const deleteIcon = useRef(null);
    const shareIcon = useRef(null);
    const [showExport, setShowExport] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showShare, setShowShare] = useState(false);

    return(
        <div className="row justify-content-end">
            <div ref={shareIcon}
                 onMouseOver={() => setShowShare(true)}
                 onMouseOut={() => setShowShare(false)}
                 className="col-2">
                <BiShareAlt
                    className={css.exportIcon}
                    color={'#1C494D'}
                    size="20px"
                    onClick={() => {}}
                />
                <Overlay target={shareIcon.current} show={showShare} placement="top">
                    {(props) => (
                        <Tooltip {...props}>
                            Share Project
                        </Tooltip>
                    )}
                </Overlay>
            </div>
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
                        execQuery(updateFolderOrProject, store.getState().projects.projects).then(() => {})
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
import React from 'react';
import {useDrag} from "react-dnd";
import css from "../projects.module.css";
import {ProjectManagementIcons} from "../../../shared/ProjectManagementIcons";
import {Project} from "../../../../../../../model/Project";
import {Folder} from "../../../../../../../model/Folder";
import {Item, Menu, Separator, Submenu, useContextMenu} from "react-contexify";
import {updateFolderOrProject} from "../../../../../../../faunadb/api/projectsFolderAPIs";
import {store} from "../../../../../../../store/store";
import {BiExport, BiRename, BiShareAlt, BiTrash} from "react-icons/bi";
import iconCss from "../../../shared/projectManagementIcon.module.css";
import {BsFillFolderSymlinkFill} from "react-icons/bs";
import {exportSimulationProject} from "../../../../../../../importExport/exportFunctions";

interface DraggableProjectCardProps {
    project: Project,
    projectsTab: Project[],
    setProjectsTab: Function,
    removeProject: Function,
    moveObject: Function,
    execQuery: Function,
    handleCardClick: Function,
    selectedFolder: Folder,
    allFoldersName: string[]
}

export const DraggableProjectCard: React.FC<DraggableProjectCardProps> = (
    {
        project, setProjectsTab, removeProject, projectsTab, moveObject, execQuery,
        handleCardClick, selectedFolder, allFoldersName
    }
) => {

    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'PROJECT',
        item: project,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [selectedFolder.name, selectedFolder.projectList.length])

    const {show} = useContextMenu({
        id: project.name,
    });

    function handleContextMenu(event: any) {
        event.preventDefault();
        show(event)
    }

    return (
        <>
            <div className={`box ${css.projectsCard}`} key={project.name} ref={dragPreview}
                 style={{opacity: isDragging ? 0.5 : 1}} onContextMenu={handleContextMenu}>
                <div className={`card-header ${css.projectsCardHeader}`} role="Handle" ref={drag}>
                    <div className="row">
                        <div className="col-6">
                            {(project.name.length > 11) ? project.name.substr(0, 11) + '...' : project.name}
                        </div>
                        {/*<div className="col-6">
                        <ProjectManagementIcons project={project}
                                                removeProject={removeProject}
                                                projectsTab={projectsTab}
                                                setProjectsTab={setProjectsTab}
                                                execQuery={execQuery}
                        />
                    </div>*/}
                    </div>
                </div>
                <div className="card-body" onClick={() => handleCardClick(project)}>
                    <img className={css.projectsProjectImage} alt="project_screenshot"
                         src={(project.screenshot) ? project.screenshot : "/noResultsIconForProject.png"}
                    />
                </div>
                <div className={`card-footer ${css.projectsCardFooter}`}>
                    {/*{(project.description.length > 20) ? project.description.substr(0, 20) + '...' : project.description}*/}
                </div>
                <Menu id={project.name}>
                    <Submenu label={
                        <>
                            <BsFillFolderSymlinkFill
                                className="me-3"
                                color={'#29686EFF'}
                                size="20px"
                            />
                            Move
                        </>
                    }>
                        {allFoldersName.filter(n => n !== selectedFolder.name).map(name => {
                            return (
                                <Item onClick={() => {
                                    moveObject({
                                        projectToMove: project,
                                        targetFolder: name
                                    })
                                    execQuery(updateFolderOrProject, store.getState().projects.projects).then(() => {
                                    })
                                }}>{name}</Item>
                            )
                        })}
                    </Submenu>
                    <Item onClick={() => {}} disabled>
                        <BiRename
                            className="me-3"
                            color={'#29686EFF'}
                            size="20px"
                        />
                        Rename
                    </Item>
                    <Separator />
                    <Item onClick={() => exportSimulationProject(project)}>
                        <BiExport
                            className="me-3"
                            color={'#29686EFF'}
                            size="20px"
                        />
                        Export
                    </Item>
                    <Item onClick={() => {}} disabled>
                        <BiShareAlt
                            className="me-3"
                            color={'#29686EFF'}
                            size="20px"
                        />
                        Share
                    </Item>
                    <Separator />
                    <Item data={project} onClick={(data) => {
                        removeProject(data.data.name)
                        setProjectsTab(projectsTab.filter(p => p.name !== project.name))
                        execQuery(updateFolderOrProject, store.getState().projects.projects).then(() => {
                        })
                    }}>
                        <BiTrash
                            className="me-3"
                            color={'#29686EFF'}
                            size="20px"
                        />
                        Delete
                    </Item>
                </Menu>
            </div>
        </>
    )

}
import React, {useState} from 'react';
import {Project} from "../../../../../../model/Project";
import css from './projects.module.css';
import {ProjectManagementIcons} from "../../shared/ProjectManagementIcons";
import {Folder} from "../../../../../../model/Folder";
import {IoMdFolder} from "react-icons/io";
import {DraggableProjectCard} from "./components/DraggableProjectCard";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DroppableAndDraggableFolder} from "./components/DroppableAndDraggableFolder";

interface ProjectsProps {
    setShowModal: Function,
    setShowNewFolderModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    folders: Folder[],
    selectedFolder: Folder,
    selectFolder: Function,
    selectProject: Function,
    removeProject: Function,
    execQuery: Function,
    moveObject: Function,
    removeFolder: Function
}

export const Projects: React.FC<ProjectsProps> = (
    {
        setShowModal, setShowNewFolderModal, projectsTab, setProjectsTab, selectTab, projects,
        folders, selectedFolder, selectFolder, removeProject, selectProject, execQuery, moveObject,
        removeFolder
    }
) => {

    const handleCardClick = (project: Project) => {
        if (!(projectsTab.filter(projectTab => projectTab.name === project.name).length > 0)) {
            setProjectsTab(projectsTab.concat(project))
        }
        selectProject(project.name)
        selectTab(project.name)
    }

    if (selectedFolder.name !== "My Files") {
        projects = selectedFolder.projectList;
        folders = selectedFolder.subFolders
    }

    const [path, setPath] = useState(["My Files"]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={`box`}>
                <div className="row pt-2">
                    <div className="col-8">
                        <h5>Files</h5>
                    </div>
                    <div
                        className={`col-2 text-end ${css.projectsNewProject}`}
                        onClick={() => setShowModal(true)}
                    >+ New Project
                    </div>
                    <div
                        className={`col-2 text-center ${css.projectsNewProject}`}
                        onClick={() => setShowNewFolderModal(true)}
                    >+ New Folder
                    </div>
                </div>

                <div className={css.folderHistory}>
                    <hr/>

                    {path.map((p, index) => {
                        return (
                            <>
                                {index !== path.length - 1 ? <span
                                    className={css.folderHistoryItem}
                                    onClick={() => {
                                        let newPath = path.filter((p, i) => i <= index)
                                        setPath(newPath)
                                        selectFolder(p)
                                    }}>
                                        {p} &gt;{' '}
                                    </span> : <span className="fw-bold">{p}</span>}
                            </>

                        )
                    })}
                    <hr/>
                </div>

                <div className={css.projectsBox}>
                    {projects.length > 0 || folders.length > 0
                        ?
                        <>
                            <div className="row">
                                {folders.length > 0 && <h5>Folders</h5>}
                                {folders.map((folder, index) => {
                                    return (
                                        <DroppableAndDraggableFolder selectFolder={selectFolder}
                                                                     folder={folder} moveObject={moveObject}
                                                                     selectedFolder={selectedFolder}
                                                                     execQuery={execQuery}
                                                                     removeFolder={removeFolder}
                                                                     path={path} setPath={setPath}
                                        />
                                    )
                                })}
                            </div>
                            <div className={`row mt-4`}>
                                {projects.length > 0 && <h5>Projects</h5>}
                                {projects.map(project => {
                                    return (
                                        <DraggableProjectCard project={project} projectsTab={projectsTab}
                                                              setProjectsTab={setProjectsTab}
                                                              removeProject={removeProject}
                                                              execQuery={execQuery} handleCardClick={handleCardClick}
                                                              selectedFolder={selectedFolder}
                                        />
                                    )
                                })}

                            </div>
                        </>

                        :
                        <>
                            <div className={css.projectsNoProjectsContainer}>
                                <img src="/noProjectsIcon2.png" className={css.projectsNoProjectsIcon}
                                     alt="No Projects Icon"/>
                                <p>No projects for now.</p>
                                <button className="btn button-primary" data-toggle="modal"
                                        data-target="#createNewProjectModal"
                                        onClick={() => {
                                            setShowModal(true)
                                        }}>CREATE YOUR FIRST PROJECT
                                </button>
                            </div>
                        </>

                    }
                </div>
            </div>
        </DndProvider>

    )

}
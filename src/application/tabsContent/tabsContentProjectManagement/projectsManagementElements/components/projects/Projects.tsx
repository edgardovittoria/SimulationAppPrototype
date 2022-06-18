import React from 'react';
import {Project} from "../../../../../../model/Project";
import css from './projects.module.css';
import {ProjectManagementIcons} from "../../shared/ProjectManagementIcons";
import {Folder} from "../../../../../../model/Folder";
import {IoMdFolder} from "react-icons/io";

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
}

export const Projects: React.FC<ProjectsProps> = (
    {
        setShowModal, setShowNewFolderModal, projectsTab, setProjectsTab, selectTab, projects,
        folders, selectedFolder, selectFolder, removeProject, selectProject
    }
) => {

    const handleCardClick = (project: Project) => {
        if (!(projectsTab.filter(projectTab => projectTab.name === project.name).length > 0)) {
            setProjectsTab(projectsTab.concat(project))
        }
        selectProject(project.name)
        selectTab(project.name)
    }

    if(selectedFolder.name !== "My Files"){
        projects = selectedFolder.projectList;
        folders = selectedFolder.subFolders
    }

    return (
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
            {
                selectedFolder.name !== 'My Files' &&
                    <div className={css.folderHistory}>
                        <hr/>
                        <span
                            onClick={() => selectFolder(selectedFolder.parent)}
                            className={css.folderHistoryItem}>
                            {selectedFolder.parent}
                        </span> &gt; <span className="fw-bold">{selectedFolder.name}</span>
                        <hr/>
                    </div>
            }
            <div className={css.projectsBox}>
                {projects.length > 0 || folders.length > 0
                    ?
                    <>
                        <div className="row">
                            {folders.length >0 && <h5>Folders</h5>}
                            {folders.map(folder => {
                                return (
                                    <div className="col-3">
                                        <div className={css.folderBox} onDoubleClick={() => selectFolder(folder)}>
                                            <IoMdFolder className="me-2"
                                                        style={{width: "35px", height: "35px"}}
                                                        color={"#7a7b7d"}
                                            />
                                            <span className="fw-bold fs-6 text-black-50">{folder.name}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={`row mt-4`}>
                            {projects.length > 0 && <h5>Projects</h5>}
                            {projects.map(project => {
                                return (
                                    <div className={`box ${css.projectsCard}`} key={project.name}>
                                        <div className={`card-header ${css.projectsCardHeader}`}>
                                            <div className="row">
                                                <div className="col-6">
                                                    {(project.name.length > 11) ? project.name.substr(0, 11) + '...' : project.name}
                                                </div>
                                                <div className="col-6">
                                                    <ProjectManagementIcons project={project}
                                                                            removeProject={removeProject}
                                                                            projectsTab={projectsTab}
                                                                            setProjectsTab={setProjectsTab}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" onClick={() => handleCardClick(project)}>
                                            <img className={css.projectsProjectImage}
                                                 src={(project.screenshot) ? project.screenshot : "/noResultsIconForProject.png"}
                                                 alt="Project Image"/>
                                        </div>
                                        <div className={`card-footer ${css.projectsCardFooter}`}>
                                            {(project.description.length > 20) ? project.description.substr(0, 20) + '...' : project.description}
                                        </div>
                                    </div>
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
    )

}
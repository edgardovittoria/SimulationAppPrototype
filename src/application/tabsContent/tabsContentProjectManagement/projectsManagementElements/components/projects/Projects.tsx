import React from 'react';
import {Project} from "../../../../../../model/Project";
import css from './projects.module.css';
import {ProjectManagementIcons} from "../../shared/ProjectManagementIcons";

interface ProjectsProps {
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    selectProject: Function,
    removeProject: Function,
}

export const Projects: React.FC<ProjectsProps> = (
    {setShowModal, projectsTab, setProjectsTab, selectTab, projects, removeProject, selectProject}
) => {

    const handleCardClick = (project: Project) => {
        if (!(projectsTab.filter(projectTab => projectTab.name === project.name).length > 0)) {
            setProjectsTab(projectsTab.concat(project))
        }
        selectProject(project.name)
        selectTab(project.name)
    }

    return (
        <div className={`box ${css.projectsBox}`}>
            {projects.length > 0
                ?
                <>
                    <div className="row pt-2">
                        <div className="col-10">
                            <h5>Projects</h5>
                        </div>
                        <div
                            className={`col-2 text-center ${css.projectsNewProject}`}
                            onClick={() => setShowModal(true)}
                        >+ New Project
                        </div>
                    </div>
                    <div className={css.projectsProjectsContainer}>

                            {projects.map(project => {
                                return (
                                    <div className={`box ${css.projectsCard}`} key={project.name}>
                                        <div className={`card-header ${css.projectsCardHeader}`}>
                                            <div className="row">
                                                <div className="col-10">
                                                    {(project.name.length > 11) ? project.name.substr(0,11) + '...' : project.name}
                                                </div>
                                                <div className="col-2">
                                                    <ProjectManagementIcons project={project} removeProject={removeProject} projectsTab={projectsTab} setProjectsTab={setProjectsTab}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" onClick={() => handleCardClick(project)}>
                                            <img className={css.projectsProjectImage}
                                                 src={(project.screenshot) ? project.screenshot : "/noResultsIconForProject.png"}
                                                 alt="Project Image"/>
                                        </div>
                                        <div className={`card-footer ${css.projectsCardFooter}`}>
                                            {(project.description.length > 20) ? project.description.substr(0,20) + '...' : project.description}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </>

                :
                <>
                    <h5>Projects</h5>
                    <div className={css.projectsNoProjectsContainer}>
                        <img src="/noProjectsIcon2.png" className={css.projectsNoProjectsIcon} alt="No Projects Icon"/>
                        <p>No projects for now.</p>
                        <button className="btn button-primary" data-toggle="modal" data-target="#createNewProjectModal"
                                onClick={() => {
                                    setShowModal(true)
                                }}>CREATE YOUR FIRST PROJECT
                        </button>
                    </div>
                </>

            }
        </div>
    )

}
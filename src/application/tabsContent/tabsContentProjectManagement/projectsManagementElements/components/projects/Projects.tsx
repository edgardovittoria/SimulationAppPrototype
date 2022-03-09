import React from 'react';
import {Project} from "../../../../../../model/Project";
import css from './projects.module.css';
import {OverlayTrigger} from "react-bootstrap";
import {BsThreeDotsVertical} from "react-icons/bs";
import {popoverRight} from "../../shared/popover/Popover";

interface ProjectsProps {
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    selectProject: Function,
    removeProject: Function
}

export const Projects: React.FC<ProjectsProps> = (
    {setShowModal, projectsTab, setProjectsTab, selectTab, projects, removeProject, selectProject}
) => {

    const handleCardClick = (project: Project) => {
        if (!(projectsTab.filter(projectTab => projectTab.name === project.name).length > 0)) {
            setProjectsTab(projectsTab.concat(project))
        }
        //dispatch(selectProject(project.name))
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
                                                    {project.name}
                                                </div>
                                                <div className="col-2">
                                                    <OverlayTrigger trigger="click" placement="right"
                                                                    overlay={popoverRight(project, removeProject, projectsTab, setProjectsTab)}>
                                                        <button className={css.projectsCardMenuButton}>
                                                            <BsThreeDotsVertical/>
                                                        </button>
                                                    </OverlayTrigger>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" onClick={() => handleCardClick(project)}>
                                            <img className={css.projectsProjectImage} src="/noresultfound.png"
                                                 alt="Project Image"/>
                                        </div>
                                        <div className={`card-footer ${css.projectsCardFooter}`}>
                                            {project.description.substr(0,15) + '...'}
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
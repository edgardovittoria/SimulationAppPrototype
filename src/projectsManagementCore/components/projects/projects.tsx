import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Project} from "../../../model/Project";
import {projectsSelector, selectProject} from "../../../store/projectSlice";
import './projects.css'
import {OverlayTrigger} from "react-bootstrap";
import {BsThreeDotsVertical} from "react-icons/bs";
import {popoverRight} from "../../shared/popover/popover";

interface ProjectsProps {
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
}

export const Projects: React.FC<ProjectsProps> = ({setShowModal, projectsTab, setProjectsTab, selectTab}) => {

    const projects = useSelector(projectsSelector)
    const dispatch = useDispatch()

    const handleCardClick = (project: Project) => {
        if (!(projectsTab.filter(projectTab => projectTab.name === project.name).length > 0)) {
            setProjectsTab(projectsTab.concat(project))
        }
        dispatch(selectProject(project.name))
        selectTab(project.name)
    }

    return (
        <div className="box projectsBox">
            {projects.length > 0
                ?
                <>
                    <div className="row pt-2">
                        <div className="col-10">
                            <h5>Projects</h5>
                        </div>
                        <div
                            className="col-2 text-center projectsNewProject"
                            onClick={() => setShowModal(true)}
                        >+ New Project
                        </div>
                    </div>
                    <div className="projectsProjectsContainer">

                            {projects.map(project => {
                                return (
                                    <div className="box projectsCard" key={project.name}>
                                        <div className="card-header projectsCardHeader">
                                            <div className="row">
                                                <div className="col-10">
                                                    {project.name}
                                                </div>
                                                <div className="col-2">
                                                    <OverlayTrigger trigger="click" placement="right"
                                                                    overlay={popoverRight(project, dispatch, projectsTab, setProjectsTab)}>
                                                        <button className="projectsCardMenuButton">
                                                            <BsThreeDotsVertical/>
                                                        </button>
                                                    </OverlayTrigger>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body" onClick={() => handleCardClick(project)}>
                                            <img className="projectsProjectImage" src="/noresultfound.png"
                                                 alt="Project Image"/>
                                        </div>
                                        <div className="card-footer projectsCardFooter">
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
                    <div className="projectsNoProjectsContainer">
                        <img src="/noProjectsIcon2.png" className="projectsNoProjectsIcon" alt="No Projects Icon"/>
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
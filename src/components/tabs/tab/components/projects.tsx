import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Project, projectsSelector, removeProject} from "../../../../store/projectSlice";
import './style/projects.css'
import {FaTrash} from "react-icons/fa";

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
        if(!(projectsTab.filter(projectTab => projectTab.name === project.name).length > 0)){
            setProjectsTab(projectsTab.concat(project))
        }
        selectTab(project.name)
    }

    return (
        <div className="box projectsBox">
            <h5>Projects</h5>
            {projects.length > 0
                ?
                <div className="row">
                    {projects.map(project => {
                        return (
                            <div className="box projectsCard" onClick={() => handleCardClick(project)}>
                                <div className="card-header projectsCardHeader">
                                    <div className="row">
                                        <div className="col-10">
                                            {project.name}
                                        </div>
                                        <div className="col-2">
                                            <FaTrash className="projectsDeleteIcon" onClick={(e) => {
                                                dispatch(removeProject(project.name))
                                                setProjectsTab(projectsTab.filter(projectTab => projectTab.name !== project.name))
                                                e.stopPropagation()
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <img className="projectsProjectImage" src="/noresultfound.png"/>
                                </div>
                                <div className="card-footer projectsCardFooter">
                                    {project.description}
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <div className="projectsNoProjectsContainer">
                    <img src="/noProjectsIcon.png" className="projectsNoProjectsIcon" alt="No Projects Icon"/>
                    <p>No projects for now.</p>
                    <button className="btn button-primary" data-toggle="modal" data-target="#createNewProjectModal"
                            onClick={() => {
                                setShowModal(true)
                            }}>CREATE YOUR FIRST PROJECT
                    </button>
                </div>
            }
        </div>
    )

}
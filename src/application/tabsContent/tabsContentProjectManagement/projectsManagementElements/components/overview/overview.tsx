import React, {useState} from 'react';
import './overview.css'
import {Project} from "../../../../../../model/Project";
import {OverlayTrigger} from "react-bootstrap";
import {BsThreeDotsVertical} from "react-icons/bs";
import {popoverRight} from "../../shared/popover/popover";

interface OverviewProps {
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    selectProject: Function,
    removeProject: Function
}

export const Overview: React.FC<OverviewProps> = (
    {setShowModal, projectsTab, setProjectsTab, selectTab, projects, selectProject, removeProject}
) => {
    const [cardMenuHovered, setCardMenuHovered] = useState(false);

    const handleCardClick = (project: Project) => {
        if(!cardMenuHovered){
            if(!(projectsTab.filter(projectTab => projectTab.name === project.name).length > 0)){
                setProjectsTab(projectsTab.concat(project))
            }
            //dispatch(selectProject(project.name))
            selectProject(project.name)
            selectTab(project.name)
        }

    }

    return (
        <>
            <div className="box boxProjects">
                <div className="titleContainer">
                    <h5>My Recent Projects</h5>
                    <a href="/#" className="newProjectLink"
                       onClick={() => {
                           setShowModal(true)
                       }}>
                        + New Project</a>
                </div>

                {projects.length === 0 ?
                    <div className="noProjectsContainer">
                        <img src="/noProjectsIcon2.png" className="noProjectsIcon" alt="No Projects Icon"/>
                        <p>No projects for now.</p>
                        <button className="btn button-primary" data-toggle="modal" data-target="#createNewProjectModal"
                                onClick={() => {
                                    setShowModal(true)
                                }}>CREATE YOUR FIRST PROJECT
                        </button>
                    </div>
                    :
                    <div className="projectsContainer">
                        {projects.map(project => {
                            return (
                                <div key={project.name} className="card" onClick={() => handleCardClick(project)}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-10 overviewProjectName">
                                                {project.name}
                                            </div>
                                            <div className="col-2" onMouseOver={() => setCardMenuHovered(!cardMenuHovered)}>
                                                <OverlayTrigger trigger="click" placement="right" overlay={popoverRight(project, removeProject, projectsTab, setProjectsTab)}>
                                                    <button className="overviewCardMenuButton">
                                                        <BsThreeDotsVertical/>
                                                    </button>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <h6 className="card-subtitle mb-2 text-muted">{project.description.substr(0,50)}</h6>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            <div className="box boxYourPlan">
                <h5>Your Plan</h5>
                <div className="yourPlanContent">
                    <h2 className="yourPlanTitle">Upgrade to a Pro <br/> Account</h2>
                    <div className="row">
                        <div className="col-7">
                            <ul>
                                <li className="li-yourPlan">
                                    text list item 1
                                </li>
                                <li className="li-yourPlan">
                                    text list item 2
                                </li>
                            </ul>
                            <button className="btn btn-seeMore">See More</button>
                        </div>
                        {/*<div className="col-5">
                            <img className="proAccountImage" src="/proAccount.png" alt="Pro Account"/>
                        </div>*/}
                    </div>
                </div>


            </div>
            <div className="box boxSimulation">
                <h5>Simulations</h5>
                <div className="simulationContent">
                    <img src="/noresultfound.png" className="noResultFoundIcon" alt="No Result Found Icon"/>
                    <p>No Results Found</p>
                </div>

            </div>


        </>
    )

}
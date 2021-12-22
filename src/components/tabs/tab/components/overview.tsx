import React from 'react';
import './style/overview.css'
import {useSelector} from "react-redux";
import {projectsSelector} from "../../../../store/projectSlice";

interface OverviewProps {
    setShowModal: Function
}

export const Overview: React.FC<OverviewProps> = ({setShowModal}) => {
    const projects = useSelector(projectsSelector)

    return (
        <div className="container">
            <div className="row rowOverview justify-content-between">

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
                            <img src="/noProjectsIcon.png" className="noProjectsIcon" alt="No Projects Icon"/>
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
                                    <div key={project.name} className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{project.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{project.description}</h6>
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
                            <div className="col-5">
                                <img className="proAccountImage" src="/proAccount.png" alt="Pro Account"/>
                            </div>
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

            </div>
            <div className="box boxCoreHours">
                <h5>Core Hours</h5>
            </div>

        </div>
    )

}
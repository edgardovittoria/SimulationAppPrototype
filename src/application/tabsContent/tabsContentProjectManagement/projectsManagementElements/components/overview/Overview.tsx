import React, { useState } from 'react';
import css from './overview.module.css';
import { Project } from "../../../../../../model/Project";
import { ImportSimProjectButton } from '../../../../../../importExport/importSimProjectButton';
import {ProjectManagementIcons} from "../../shared/ProjectManagementIcons";
import {Simulations} from "../simulations/Simulations";
import {Folder} from "../../../../../../model/Folder";
import {useDispatch, useSelector} from "react-redux";
import {projectsSelector, selectProject} from "../../../../../../store/projectSlice";

interface OverviewProps {
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    setMenuItem: Function,
    setSimulationCoreMenuItemSelected: Function,
    setSelectedSimulation: Function,
}

export const Overview: React.FC<OverviewProps> = (
    {
        setShowModal, projectsTab, setProjectsTab, selectTab,setMenuItem,setSimulationCoreMenuItemSelected,
        setSelectedSimulation
    }
) => {

    const dispatch = useDispatch()
    const projects = useSelector(projectsSelector)
    const [cardMenuHovered, setCardMenuHovered] = useState(false);


    const handleCardClick = (project: Project) => {
        if (!cardMenuHovered) {
            if (!(projectsTab.filter(projectTab => projectTab.name === project.name).length > 0)) {
                setProjectsTab(projectsTab.concat(project))
            }
            dispatch(selectProject(project.name))
            selectTab(project.name)
        }

    }


    return (
        <>
            <div className={`box ${css.boxProjects}`}>
                <div className={css.titleContainer}>
                    <h5>My Recent Projects</h5>
                    <button className={css.newProjectLink}
                        onClick={() => {
                            setShowModal(true)
                        }}>
                        + New Project</button>
                    <ImportSimProjectButton className={css.newProjectLink} setMenuItem={setMenuItem}>
                        Import Project
                    </ImportSimProjectButton>
                </div>

                {projects.length === 0 ?
                    <div className={css.noProjectsContainer}>
                        <img src="/noProjectsIcon2.png" className={css.noProjectsIcon} alt="No Projects Icon" />
                        <p>No projects for now.</p>
                        <button className="btn button-primary" data-toggle="modal" data-target="#createNewProjectModal"
                            onClick={() => {
                                setShowModal(true)
                            }}>CREATE YOUR FIRST PROJECT
                        </button>
                    </div>
                    :
                    <div className={css.projectsContainer}>
                        {projects.map(project => {
                            return (
                                <div key={project.name} className={css.card} onClick={() => handleCardClick(project)}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className={`col-6 ${css.overviewProjectName}`}>
                                                {(project.name.length > 15) ? project.name.substr(0,15) + '...' : project.name}
                                            </div>
                                            <div className="col-6" onMouseOver={() => setCardMenuHovered(!cardMenuHovered)}>
                                                <ProjectManagementIcons project={project}/>
                                            </div>
                                        </div>
                                        <h6 className="card-subtitle mb-2 text-muted">{project.description.substr(0, 50)}</h6>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            <div className={`box ${css.boxYourPlan}`}>
                <h5>Your Plan</h5>
                <div className={css.yourPlanContent}>
                    <h2 className={css.yourPlanTitle}>Upgrade to a Pro <br /> Account</h2>
                    <div className="row">
                        <div className="col-7">
                            <ul>
                                <li className={css.liYourPlan}>
                                    text list item 1
                                </li>
                                <li className={css.liYourPlan}>
                                    text list item 2
                                </li>
                            </ul>
                            <button className={`btn ${css.btnSeeMore}`}>See More</button>
                        </div>
                    </div>
                </div>


            </div>
            <div className="mt-3 justify-content-between box h-50">
                <h5 className="">Simulations</h5>
                <Simulations
                    selectTab={selectTab}
                    setSimulationCoreMenuItemSelected={setSimulationCoreMenuItemSelected}
                    setSelectedSimulation={setSelectedSimulation}
                    setProjectsTab={setProjectsTab}
                    projectsTab={projectsTab}
                />
            </div>


        </>
    )

}


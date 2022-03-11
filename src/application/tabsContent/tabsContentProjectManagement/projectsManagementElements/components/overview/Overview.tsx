import React, { useState } from 'react';
import css from './overview.module.css';
import { Project } from "../../../../../../model/Project";
import { ImportSimProjectButton } from '../../../../../../importExport/importSimProjectButton';
import {ProjectManagementIcons} from "../../shared/ProjectManagementIcons";

interface OverviewProps {
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    selectProject: Function,
    removeProject: Function,
    setMenuItem: Function
}

export const Overview: React.FC<OverviewProps> = (
    { setShowModal, projectsTab, setProjectsTab, selectTab, projects, selectProject, removeProject, setMenuItem }
) => {
    const [cardMenuHovered, setCardMenuHovered] = useState(false);


    const handleCardClick = (project: Project) => {
        if (!cardMenuHovered) {
            if (!(projectsTab.filter(projectTab => projectTab.name === project.name).length > 0)) {
                setProjectsTab(projectsTab.concat(project))
            }
            selectProject(project.name)
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
                                            <div className={`col-10 ${css.overviewProjectName}`}>
                                                {(project.name.length > 15) ? project.name.substr(0,15) + '...' : project.name}
                                            </div>
                                            <div className="col-2" onMouseOver={() => setCardMenuHovered(!cardMenuHovered)}>
                                                <ProjectManagementIcons project={project} removeProject={removeProject} projectsTab={projectsTab} setProjectsTab={setProjectsTab}/>
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
            <div className={`box ${css.boxSimulation}`}>
                <h5>Simulations</h5>
                <div className={css.simulationContent}>
                    <img src="/noresultfound.png" className={css.noResultFoundIcon} alt="No Result Found Icon" />
                    <p>No Results Found</p>
                </div>

            </div>


        </>
    )

}


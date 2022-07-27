import React from 'react';
import {useDrag} from "react-dnd";
import css from "../projects.module.css";
import {ProjectManagementIcons} from "../../../shared/ProjectManagementIcons";
import {Project} from "../../../../../../../model/Project";
import {Folder} from "../../../../../../../model/Folder";

interface DraggableProjectCardProps {
    project: Project,
    projectsTab: Project[],
    setProjectsTab: Function,
    removeProject: Function,
    execQuery: Function,
    handleCardClick: Function,
    selectedFolder: Folder
}

export const DraggableProjectCard: React.FC<DraggableProjectCardProps> = (
    {
        project, setProjectsTab, removeProject, projectsTab, execQuery, handleCardClick, selectedFolder
    }
) => {

    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'PROJECT',
        item: project,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [selectedFolder.name, selectedFolder.projectList.length])

    return(
        <div className={`box ${css.projectsCard}`} key={project.name} ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1}}>
            <div className={`card-header ${css.projectsCardHeader}`} role="Handle" ref={drag}>
                <div className="row">
                    <div className="col-6">
                        {(project.name.length > 11) ? project.name.substr(0, 11) + '...' : project.name}
                    </div>
                    <div className="col-6">
                        <ProjectManagementIcons project={project}
                                                removeProject={removeProject}
                                                projectsTab={projectsTab}
                                                setProjectsTab={setProjectsTab}
                                                execQuery={execQuery}
                        />
                    </div>
                </div>
            </div>
            <div className="card-body" onClick={() => handleCardClick(project)}>
                <img className={css.projectsProjectImage} alt="project_screenshot"
                     src={(project.screenshot) ? project.screenshot : "/noResultsIconForProject.png"}
                />
            </div>
            <div className={`card-footer ${css.projectsCardFooter}`}>
                {/*{(project.description.length > 20) ? project.description.substr(0, 20) + '...' : project.description}*/}
            </div>
        </div>
    )

}
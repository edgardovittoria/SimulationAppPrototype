import React, {useState} from 'react';
import {Project} from "../../../model/Project";
import {Modal} from "react-bootstrap";
import "./createNewProjectModal.css"
import {Simulation} from "../../../model/Simulation";

interface CreateNewProjectModalProps {
    show: boolean,
    setShow: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    addNewProject: Function,
    selectProject: Function
}

export const CreateNewProjectModal: React.FC<CreateNewProjectModalProps> = (
    {show, setShow, projectsTab, setProjectsTab, selectTab, addNewProject, selectProject}
) => {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    const handleClose = () => setShow(false);
    const handleCreate = () => {
        if(projectName.length > 0){
            let simulation: Simulation = {name: 'Test Simulation', started: new Date().toLocaleString(), ended: new Date().toLocaleString(), status: 'Paused'}
            let newProject: Project = {name: projectName, description: projectDescription, model: "", materials: "", physics: "", simulations: [simulation]}
            //dispatch(addProject(newProject))
            addNewProject(newProject)
            //dispatch(selectProject(newProject.name))
            selectProject(newProject.name)
            setProjectsTab(projectsTab.concat(newProject))
            selectTab(newProject.name)
            setShow(false)
        }else{
            alert("Project's name is required!")
        }

    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>CREATE NEW PROJECT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-grid">
                    <div className="modalInput">
                        <h6>Insert Project's Name</h6>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Project's Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}/>
                    </div>
                    <div className="modalInput">
                        <h6>Insert Project's Description</h6>
                        <textarea
                            className="form-control"
                            placeholder="Project's Description"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}/>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    CLOSE
                </button>
                <button className="btn button-primary" onClick={handleCreate}>
                    CREATE
                </button>
            </Modal.Footer>
        </Modal>
    )

}
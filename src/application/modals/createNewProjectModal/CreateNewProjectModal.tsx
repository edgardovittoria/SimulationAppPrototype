import React, {useState} from 'react';
import {Project} from "../../../model/Project";
import {Modal} from "react-bootstrap";
import {CanvasState, useFaunaQuery, UsersState, usersStateSelector} from 'cad-library';
import {addIDInFolderProjectsList, createSimulationProjectInFauna} from "../../../faunadb/api/projectsFolderAPIs";
import {addProject, SelectedFolderSelector, selectProject} from '../../../store/projectSlice';
import {useDispatch, useSelector} from 'react-redux';

interface CreateNewProjectModalProps {
    setShow: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
}

export const CreateNewProjectModal: React.FC<CreateNewProjectModalProps> = (
    {
        setShow, projectsTab, setProjectsTab, selectTab,
    }
) => {

    const dispatch = useDispatch()

    const user = useSelector(usersStateSelector)
    const selectedFolder = useSelector(SelectedFolderSelector)

    const {execQuery} = useFaunaQuery()

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");


    const handleClose = () => setShow(false);
    const handleCreate = () => {
        if(projectName.length > 0){
            let newProject: Project = {
                name: projectName,
                description: projectDescription,
                model: {} as CanvasState,
                ports: [],
                simulations: [],
                screenshot: undefined,
                owner: user,
                sharedWidth: [] as UsersState[]
            }
            execQuery(createSimulationProjectInFauna, newProject).then((res: any) => {
                newProject = {
                    ...newProject,
                    faunaDocumentId: res.ref.value.id
                } as Project
                execQuery(addIDInFolderProjectsList, newProject.faunaDocumentId, selectedFolder)
                dispatch(addProject(newProject))
            })
            dispatch(selectProject(newProject.name))
            setProjectsTab(projectsTab.concat(newProject))
            selectTab(newProject.name)
            setShow(false)
        }else{
            alert("Project's name is required!")
        }
    }

    return(
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>CREATE NEW PROJECT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-grid">
                    <div className="p-2">
                        <h6>Insert Project's Name</h6>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Project's Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}/>
                    </div>
                    <div className="p-2">
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
                <button className="button btn-secondary" onClick={handleClose}>
                    CLOSE
                </button>
                <button className="button buttonPrimary" onClick={handleCreate}>
                    CREATE
                </button>
            </Modal.Footer>
        </Modal>
    )

}
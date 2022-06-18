import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {Project} from "../../../model/Project";
import {CanvasState, UsersState} from "cad-library";
import {Folder} from "../../../model/Folder";

interface CreateNewFolderModalProps {
    showNewFolderModal: boolean,
    setShowNewFolderModal: Function,
    addNewFolder: Function,
    user: UsersState,
    selectedFolder: Folder
}

export const CreateNewFolderModal: React.FC<CreateNewFolderModalProps> = (
    {
        showNewFolderModal, setShowNewFolderModal, addNewFolder, user, selectedFolder
    }
) => {

    const [folderName, setFolderName] = useState("");

    const handleClose = () => setShowNewFolderModal(false)

    const handleCreate = () => {
        if(folderName.length > 0){
            let newFolder: Folder = {
                name: folderName,
                owner: user,
                sharedWidth: [],
                projectList: [],
                subFolders: [],
                parent: selectedFolder.name
            }
            addNewFolder(newFolder)
            setShowNewFolderModal(false)
        }else{
            alert("Folder's name is required!")
        }
    }

    return (
        <Modal show={showNewFolderModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>CREATE NEW FOLDER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-grid">
                    <div className="p-2">
                        <h6>Insert Folder's Name</h6>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Folder's Name"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}/>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    CLOSE
                </button>
                <button className="btn button-primary" onClick={handleCreate}>
                    CREATE FOLDER
                </button>
            </Modal.Footer>
        </Modal>
    )

}
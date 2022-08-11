import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {UsersState} from "cad-library";
import {Folder} from "../../../model/Folder";
import {createFolderInFauna, addIDInSubFoldersList} from "../../../faunadb/api/projectsFolderAPIs";
import {store} from "../../../store/store";

interface CreateNewFolderModalProps {
    setShowNewFolderModal: Function,
    addNewFolder: Function,
    user: UsersState,
    selectedFolder: Folder,
    selectFolder: Function,
    execQuery: Function,
}

export const CreateNewFolderModal: React.FC<CreateNewFolderModalProps> = (
    {
        setShowNewFolderModal, addNewFolder, user, selectedFolder, selectFolder, execQuery
    }
) => {

    const [folderName, setFolderName] = useState("");

    const handleClose = () => setShowNewFolderModal(false)


    const handleCreate = () => {
        if(folderName.length > 0){
            let newFolder: Folder = {
                name: folderName,
                owner: user,
                sharedWith: [],
                projectList: [],
                subFolders: [],
                parent: selectedFolder.faunaDocumentId as string,
            }
            execQuery(createFolderInFauna, newFolder).then((ret: any) => {
                newFolder = {...newFolder, faunaDocumentId: ret.ref.value.id}
                addNewFolder(newFolder)
                execQuery(addIDInSubFoldersList, newFolder.faunaDocumentId, selectedFolder)
            })
            setShowNewFolderModal(false)
        }else{
            alert("Folder's name is required!")
        }
    }

    return (
        <Modal show={true} onHide={handleClose}>
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
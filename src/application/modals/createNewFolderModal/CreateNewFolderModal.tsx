import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {useFaunaQuery, usersStateSelector} from "cad-library";
import {Folder} from "../../../model/Folder";
import {createFolderInFauna, addIDInSubFoldersList} from "../../../faunadb/api/projectsFolderAPIs";
import {useDispatch, useSelector} from "react-redux";
import {addFolder, SelectedFolderSelector} from "../../../store/projectSlice";

interface CreateNewFolderModalProps {
    setShowNewFolderModal: Function,
}

export const CreateNewFolderModal: React.FC<CreateNewFolderModalProps> = (
    {
        setShowNewFolderModal
    }
) => {

    const dispatch = useDispatch()

    const user = useSelector(usersStateSelector)
    const selectedFolder = useSelector(SelectedFolderSelector)

    const {execQuery} = useFaunaQuery()

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
                dispatch(addFolder(newFolder))
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
                <button className="button btn-secondary" onClick={handleClose}>
                    CLOSE
                </button>
                <button className="button buttonPrimary" onClick={handleCreate}>
                    CREATE FOLDER
                </button>
            </Modal.Footer>
        </Modal>
    )

}
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import './GlobalColors.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-contexify/dist/ReactContexify.css';
import { TabsContainer } from "./application/tabsContainer/TabsContainer";
import {
    addProject,
    importModel, moveObject, projectsSelector, removeFolder,
    removeProject,
    resetSelectedComponents, selectedProjectSelector, selectProject, setProjectsFolderToUser
} from "./store/projectSlice";
import { Project } from "./model/Project";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewProjectModal } from "./application/modals/createNewProjectModal/CreateNewProjectModal";
import { Simulation } from "./model/Simulation";
import { MenuBar } from './application/tabsContent/menuBar/MenuBar';
import {
    TabsContentProjectManagementFactory
} from './application/tabsContent/tabsContentProjectManagement/factory/TabsContentProjectManagementFactory';
import {
    TabsContentSimulationFactory
} from './application/tabsContent/tabsContentSimulation/factory/TabsContentSimulationFactory';
import {
    ImportActionParamsObject,
    ImportModelFromDBModal,
    usersStateSelector,
    CanvasState,
    useFaunaQuery
} from "cad-library";
import { CreateNewFolderModal } from "./application/modals/createNewFolderModal/CreateNewFolderModal";
import { addFolder, FolderStateSelector, SelectedFolderSelector, selectFolder } from "./store/projectSlice";
import { Folder } from "./model/Folder";
import {getProjectsFolderByOwner} from "./faunadb/api/projectsFolderAPIs";


function App() {

    const projects = useSelector(projectsSelector)
    const selectedProject = useSelector(selectedProjectSelector)
    const folders = useSelector(FolderStateSelector)
    const selectedFolder = useSelector(SelectedFolderSelector)
    const user = useSelector(usersStateSelector)
    const dispatch = useDispatch()
    const [tabSelected, setTabSelected] = useState("DASHBOARD");
    const [projectsTab, setProjectsTab] = useState<Project[]>(projects);
    const [showCreateNewProjectModal, setShowCreateNewProjectModal] = useState(false);
    const [showCreateNewFolderModal, setShowCreateNewFolderModal] = useState(false);
    const [showModalLoadFromDB, setShowModalLoadFromDB] = useState(false)

    const menuItems = getMenuItemsArrayBasedOnTabType(tabSelected)
    const [menuItemSelected, setMenuItemSelected] = useState(menuItems[0]);

    const [selectedSimulation, setSelectedSimulation] = useState<Simulation | undefined>(undefined);

    const {execQuery} = useFaunaQuery()

    useEffect(() => {
        if(user.userName){
            execQuery(getProjectsFolderByOwner, user.userName).then(res => {
                dispatch(setProjectsFolderToUser({
                    ...res.data,
                    faunaDocumentId: res.ref.value.id
                }))
                dispatch(selectFolder({
                    ...res.data,
                    faunaDocumentId: res.ref.value.id
                }))
            })
        }
    }, [user.userName]);


    const memoizedTabsContainer = useMemo(() => <TabsContainer
        selectTab={setTabSelected}
        selectedTab={tabSelected}
        projectsTab={projectsTab}
        setProjectsTab={setProjectsTab}
        setShowModal={setShowCreateNewProjectModal}
        selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
        resetSelectedComponentsArray={() => dispatch(resetSelectedComponents())}
        user={user}
    />, [tabSelected, projectsTab, user]);


    useEffect(() => {
        if (menuItemSelected !== "Results") {
            setMenuItemSelected(menuItems[0])
        }
    }, [tabSelected])

    return (
        <>
            {memoizedTabsContainer}
            <MenuBar setMenuItem={setMenuItemSelected} activeMenuItem={menuItemSelected} menuItems={menuItems} />
            {(tabSelected === 'DASHBOARD')
                ?
                <TabsContentProjectManagementFactory
                    menuItem={menuItemSelected}
                    setShowModal={setShowCreateNewProjectModal}
                    setShowNewFolderModal={setShowCreateNewFolderModal}
                    projectsTab={projectsTab}
                    setProjectsTab={setProjectsTab}
                    selectTab={setTabSelected}
                    projects={projects}
                    folders={folders}
                    selectedFolder={selectedFolder}
                    selectFolder={(folder: Folder) => dispatch(selectFolder(folder))}
                    selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
                    removeProject={(projectName: string) => dispatch(removeProject(projectName))}
                    setSimulationCoreMenuItemSelected={setMenuItemSelected}
                    setSelectedSimulation={setSelectedSimulation}
                    setMenuItem={setMenuItemSelected}
                    execQuery={execQuery}
                    moveObject={(obj: {projectToMove: Project | Folder, targetFolder: string}) => dispatch(moveObject(obj))}
                    removeFolder={(folder: Folder) => dispatch(removeFolder(folder))}
                />
                :
                <TabsContentSimulationFactory
                    menuItem={menuItemSelected}
                    setMenuItem={setMenuItemSelected}
                    selectedSimulation={selectedSimulation}
                    setSelectedSimulation={setSelectedSimulation}
                    setShowLoadFromDBModal={setShowModalLoadFromDB}
                />
            }
            {(showCreateNewProjectModal) && <CreateNewProjectModal
                setShow={setShowCreateNewProjectModal}
                projectsTab={projectsTab}
                setProjectsTab={setProjectsTab}
                selectTab={setTabSelected}
                addNewProject={(project: Project) => dispatch(addProject(project))}
                selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
                user={user}
                selectFolder={(folder: Folder) => dispatch(selectFolder(folder))}
                execQuery={execQuery}
            />}
            {(showCreateNewFolderModal) && <CreateNewFolderModal
                setShowNewFolderModal={setShowCreateNewFolderModal}
                addNewFolder={(folder: Folder) => dispatch(addFolder(folder))}
                user={user}
                selectedFolder={selectedFolder}
                selectFolder={(folder: Folder) => dispatch(selectFolder(folder))}
                execQuery={execQuery}
            />}
            {(showModalLoadFromDB) && <ImportModelFromDBModal
                showModalLoad={setShowModalLoadFromDB}
                importAction={importModel}
                importActionParams={
                    {
                        canvas: {
                            components: [],
                            lastActionType: "",
                            numberOfGeneratedKey: 0,
                            selectedComponentKey: 0
                        } as CanvasState,
                        id: selectedProject?.name
                    } as ImportActionParamsObject
                }
            />}
        </>


    );
}

const getMenuItemsArrayBasedOnTabType = (tabType: string) => {
    switch (tabType) {
        case "DASHBOARD":
            return ['Overview', 'Projects', 'Simulations']
        default:
            return ['Modeler', 'Physics', 'Simulator', 'Results']
    }
}

export default App;

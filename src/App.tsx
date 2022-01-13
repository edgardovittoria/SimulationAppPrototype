import React, {useState} from 'react';
import './App.css';
import './GlobalColors.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabsContainer} from "./application/tabsContainer/TabsContainer";
import {
    addProject,
    projectsSelector,
    resetSelectedComponents, selectProject
} from "./store/projectSlice";
import {Project} from "./model/Project";
import {useDispatch, useSelector} from "react-redux";
import {CreateNewProjectModal} from "./application/modals/createNewProjectModal/CreateNewProjectModal";
import {TabsContentProjectManagement} from "./application/tabsContent/tabsContentProjectManagement/TabsContentProjectManagement";
import {TabContentSimulation} from "./application/tabsContent/tabsContentSimulation/TabContentSimulation";


function App() {

    const projects = useSelector(projectsSelector)
    const dispatch = useDispatch()
    const [tabSelected, setTabSelected] = useState("DASHBOARD");
    const [projectsTab, setProjectsTab] = useState<Project[]>(projects);
    const [showCreateNewProjectModal, setShowCreateNewProjectModal] = useState(false);


    return (
        <>
            <TabsContainer
                selectTab={setTabSelected}
                selectedTab={tabSelected}
                projectsTab={projectsTab}
                setProjectsTab={setProjectsTab}
                setShowModal={setShowCreateNewProjectModal}
                selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
                resetSelectedComponentsArray={() => dispatch(resetSelectedComponents())}
            />
            {(tabSelected === 'DASHBOARD')
                ?
                <TabsContentProjectManagement
                    setShowModal={setShowCreateNewProjectModal}
                    projectsTab={projectsTab}
                    setProjectsTab={setProjectsTab}
                    selectTab={setTabSelected}
                />
                : <TabContentSimulation/>
            }
            <CreateNewProjectModal
                show={showCreateNewProjectModal}
                setShow={setShowCreateNewProjectModal}
                projectsTab={projectsTab}
                setProjectsTab={setProjectsTab}
                selectTab={setTabSelected}
                addNewProject={(project: Project) => dispatch(addProject(project))}
                selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
            />
        </>


    );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import './GlobalColors.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabsContainer} from "./navBar/tabsContainer/tabsContainer";
import {TabContent} from "./navBar/tab/tabContent/tabContent";
import {FaBell, FaUser} from "react-icons/fa";
import {
    addProject, importModel,
    projectsSelector,
    removeProject,
    selectedProjectSelector,
    selectProject
} from "./store/projectSlice";
import {Project} from "./model/Project";
import {useDispatch, useSelector} from "react-redux";
import {CreateNewProjectModal} from "./projectsManagementCore/modals/createNewProjectModal/createNewProjectModal";


function App() {

    const projects = useSelector(projectsSelector)
    const selectedProject = useSelector(selectedProjectSelector)
    const dispatch = useDispatch()
    const [tabSelected, setTabSelected] = useState("DASHBOARD");
    const [projectsTab, setProjectsTab] = useState<Project[]>(projects);
    const [showCreateNewProjectModal, setShowCreateNewProjectModal] = useState(false);


    return (
      <>
          <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                  <a className="navbar-brand" href="/">SimulationApp</a>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <TabsContainer
                          selectTab={setTabSelected}
                          selectedTab={tabSelected}
                          projectsTab={projectsTab}
                          setProjectsTab={setProjectsTab}
                          setShowModal={setShowCreateNewProjectModal}
                          selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
                      />
                  </div>
                  <div className="mr-auto notificationContainer">
                    <FaBell className="notificationIcon"/>
                    <FaUser className="userIcon"/>
                  </div>
              </div>
          </nav>
          <TabContent
              name={tabSelected}
              setShowModal={setShowCreateNewProjectModal}
              projectsTab={projectsTab}
              setProjectsTab={setProjectsTab}
              selectTab={setTabSelected}
              projects={projects}
              selectedProject={selectedProject}
              selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
              removeProject={(projectName: string) => dispatch(removeProject(projectName))}
              importModel={importModel}
          />
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

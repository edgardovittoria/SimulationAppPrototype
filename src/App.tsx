import React, {useEffect, useState} from 'react';
import './App.css';
import './GlobalColors.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabsContainer} from "./navBar/tabsContainer/tabsContainer";
import {TabContent} from "./navBar/tab/tabContent/tabContent";
import {FaBell, FaUser} from "react-icons/fa";
import {Project, projectsSelector} from "./store/projectSlice";
import {useSelector} from "react-redux";
import {CreateNewProjectModal} from "./projectsManagementCore/modals/createNewProjectModal/createNewProjectModal";


function App() {

    const projects = useSelector(projectsSelector)
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
          />
          <CreateNewProjectModal
              show={showCreateNewProjectModal}
              setShow={setShowCreateNewProjectModal}
              projectsTab={projectsTab}
              setProjectsTab={setProjectsTab}
              selectTab={setTabSelected}
          />
      </>


  );
}

export default App;

import React, {useEffect, useState} from 'react';
import './App.css';
import './GlobalColors.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabsContainer} from "./components/tabs/tabsContainer";
import {TabContent} from "./components/tabs/tab/tabContent";
import {FaBell, FaUser} from "react-icons/fa";
import {Project, projectsSelector} from "./store/projectSlice";
import {useSelector} from "react-redux";
import {CreateNewProjectModal} from "./components/modals/createNewProjectModal/createNewProjectModal";


function App() {

    const projects = useSelector(projectsSelector)
    const [tabSelected, setTabSelected] = useState("DASHBOARD");
    const [projectsTab, setProjectsTab] = useState<Project[]>(projects);
    const [showCreateNewProjectModal, setShowCreateNewProjectModal] = useState(false);

    useEffect(() => {
        console.log(tabSelected)
    }, [tabSelected]);


    return (
      <>
          <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                  <a className="navbar-brand" href="/">SimulationApp</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"/>
                  </button>
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

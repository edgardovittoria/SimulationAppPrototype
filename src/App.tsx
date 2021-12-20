import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TabsContainer} from "./components/tabs/tabsContainer";
import {TabContent} from "./components/tabs/tab/tabContent";
import {FaBell, FaUser} from "react-icons/fa";


function App() {

    const [tabSelected, setTabSelected] = useState("DASHBOARD");

    return (
      <>
          <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                  <a className="navbar-brand" href="#">SimulationApp</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"/>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <TabsContainer selectTab={setTabSelected} selectedTab={tabSelected}/>
                  </div>
                  <div className="mr-auto notificationContainer">
                    <FaBell className="notificationIcon"/>
                    <FaUser className="userIcon"/>
                  </div>
              </div>
          </nav>
          <TabContent name={tabSelected}/>
      </>


  );
}

export default App;

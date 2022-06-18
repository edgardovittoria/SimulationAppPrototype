import React, {useState} from 'react';
import { FaBell, FaPlus, FaTimes, FaUser } from "react-icons/fa";
import css from './tabsContainer.module.css'
import { Project } from "../../model/Project";
import { useAuth0 } from "@auth0/auth0-react";
import {SetUserInfo, UsersState, usersStateSelector} from 'cad-library';
import {IoIosSettings} from "react-icons/io";
import {HiOutlineLogout} from "react-icons/hi";
import {useSelector} from "react-redux";

interface TabsContainerProps {
    selectTab: Function,
    selectedTab: string,
    projectsTab: Project[]
    setProjectsTab: Function,
    setShowModal: Function,
    selectProject: Function,
    resetSelectedComponentsArray: Function,
    user: UsersState
}

export const TabsContainer: React.FC<TabsContainerProps> = (
    {
        selectTab, selectedTab, projectsTab, setProjectsTab, setShowModal,
        selectProject, resetSelectedComponentsArray, user
    }
) => {

    const closeProjectTab = (projectLabel: string) => {
        setProjectsTab(projectsTab.filter(projectTab => projectTab.name !== projectLabel))
        selectTab("DASHBOARD")
    }

    const [userDropdownVisibility, setUserDropdownVisibility] = useState(false);




    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

    return (
        <>
            <SetUserInfo />
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">ESimIA</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="nav nav-tabs">
                            <li className={`nav-item ${css.navItemTabs}`} onClick={() => {
                                selectTab("DASHBOARD")
                                selectProject(undefined)
                                resetSelectedComponentsArray()
                            }}>
                                <div
                                    className={(selectedTab === 'DASHBOARD') ? `nav-link active ${css.projectTab}` : `nav-link ${css.projectTabNotActive}`}
                                    aria-current="page"
                                >Dashboard
                                </div>
                            </li>
                            {projectsTab.map(projectTab => {
                                return <li key={projectTab.name} className={`nav-item ${css.navItemTabs}`}>
                                    <div
                                        className={(selectedTab === projectTab.name) ? 'nav-link active d-flex' : 'nav-link d-flex'}>
                                        <div
                                            className={(selectedTab === projectTab.name) ? css.projectTab : css.projectTabNotActive}
                                            aria-current="page" onClick={() => {
                                                selectTab(projectTab.name)
                                                selectProject(projectTab.name)
                                                resetSelectedComponentsArray()
                                            }}>{projectTab.name}
                                        </div>
                                        <div className={css.closeIconContainer} onClick={() => {
                                            closeProjectTab(projectTab.name)
                                            selectProject(undefined)
                                            resetSelectedComponentsArray()
                                        }}>
                                            <FaTimes className={css.closeIcon} />
                                        </div>
                                    </div>

                                </li>
                            })}
                            <li className={`nav-item ${css.addNewProject}`}>
                                <FaPlus onClick={() => setShowModal(true)} className={css.addNewProjectIcon} />
                            </li>
                        </ul>
                    </div>
                    <div className={`${css.notificationContainer}`}>
                        <FaBell className={css.notificationIcon} />
                        {isAuthenticated ?
                            <div className="position-relative">
                                <FaUser className={css.userIcon} onClick={() => setUserDropdownVisibility(!userDropdownVisibility)}/>
                                <ul style={{display: !userDropdownVisibility ? "none" : "block"}}
                                    className={css.userDropdown}>
                                    <li className={css.userNameText}>{user.userName}</li>
                                    <hr/>
                                    <div className={`d-flex align-items-center ${css.listItemProfileMenu}`}>
                                        <IoIosSettings className={css.listItemIcon}/>
                                        <li>Settings</li>
                                    </div>
                                    <hr/>
                                    <div className={`d-flex align-items-center ${css.listItemProfileMenu}`}
                                         onClick={() => logout({ returnTo: window.location.origin })}>
                                        <HiOutlineLogout className={css.listItemIcon}/>
                                        <li>Logout</li>
                                    </div>

                                </ul>
                            </div>
                             :
                            <button className={css.loginButton}
                                    onClick={loginWithRedirect}>
                                Login
                            </button>}
                        {/*{isAuthenticated ? <FaUser className={css.userIcon} onClick={() => logout({ returnTo: window.location.origin })} /> :
                            <RiLoginBoxFill className={css.userIcon} onClick={() => {
                                loginWithRedirect()
                            }} />
                        }*/}
                    </div>
                </div>
            </nav>
        </>

    )

}
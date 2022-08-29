import React, {useState} from 'react';
import { FaBell, FaPlus, FaTimes, FaUser } from "react-icons/fa";
import { Project } from "../../model/Project";
import { useAuth0 } from "@auth0/auth0-react";
import {SetUserInfo, UsersState} from 'cad-library';
import {IoIosSettings} from "react-icons/io";
import {HiOutlineLogout} from "react-icons/hi";
import { useDispatch } from 'react-redux';
import {selectProject} from '../../store/projectSlice';

interface TabsContainerProps {
    selectTab: Function,
    selectedTab: string,
    projectsTab: Project[]
    setProjectsTab: Function,
    setShowModal: Function,
    user: UsersState
}

export const TabsContainer: React.FC<TabsContainerProps> = (
    {
        selectTab, selectedTab, projectsTab, setProjectsTab, setShowModal,
        user
    }
) => {

    const dispatch = useDispatch()

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
                            <li className={`bg-[#dadada] rounded`} onClick={() => {
                                selectTab("DASHBOARD")
                                dispatch(selectProject(undefined))
                            }}>
                                <div
                                    className={(selectedTab === 'DASHBOARD') ? `nav-link active text-black` : `nav-link hover:cursor-pointer`}
                                    aria-current="page"
                                >Dashboard
                                </div>
                            </li>
                            {projectsTab.map(projectTab => {
                                return <li key={projectTab.name} className={`bg-[#dadada] rounded`}>
                                    <div
                                        className={(selectedTab === projectTab.name) ? 'nav-link active flex' : 'nav-link flex'}>
                                        <div
                                            className={(selectedTab === projectTab.name) ? 'text-black' : 'text-gray-400 hover:cursor-pointer'}
                                            aria-current="page" onClick={() => {
                                                selectTab(projectTab.name)
                                                dispatch(selectProject(projectTab.name))
                                            }}>{projectTab.name}
                                        </div>
                                        <div className="ml-8" onClick={() => {
                                            closeProjectTab(projectTab.name)
                                            dispatch(selectProject(undefined))
                                        }}>
                                            <FaTimes className="w-[12px] h-[12px] text-gray-400" />
                                        </div>
                                    </div>

                                </li>
                            })}
                            <li className={`nav-item m-auto mx-4`}>
                                <FaPlus onClick={() => setShowModal(true)} className="w-[12px] h-[12px] text-gray-400" />
                            </li>
                        </ul>
                    </div>
                    <div className="pb-[7px] contents">
                        <FaBell className="w-[20px] h-[20px] mr-4 text-primaryColor hover:text-secondaryColor hover:cursor-pointer" />
                        {isAuthenticated ?
                            <div className="position-relative">
                                <FaUser className="w-[20px] h-[20px] mr-4 text-primaryColor hover:text-secondaryColor hover:cursor-pointer" onClick={() => setUserDropdownVisibility(!userDropdownVisibility)}/>
                                <ul style={{display: !userDropdownVisibility ? "none" : "block"}}
                                    className="p-[20px] bg-white rounded list-none absolute right-[10px] mt-[8px] w-max shadow z-[10000]">
                                    <li className="font-bold text-secondaryColor">{user.userName}</li>
                                    <hr/>
                                    <div className={`flex items-center p-[5px] hover:bg-opacity-40 hover:bg-secondaryColor hover:font-semibold hover:cursor-pointer`}>
                                        <IoIosSettings className="w-[20px] h-[20px] mr-[10px] text-primaryColor"/>
                                        <li>Settings</li>
                                    </div>
                                    <hr/>
                                    <div className={`flex items-center p-[5px] hover:bg-opacity-40 hover:bg-secondaryColor hover:font-semibold hover:cursor-pointer`}
                                         onClick={() => logout({ returnTo: window.location.origin })}>
                                        <HiOutlineLogout className="w-[20px] h-[20px] mr-[10px] text-primaryColor"/>
                                        <li>Logout</li>
                                    </div>

                                </ul>
                            </div>
                             :
                            <button className="bg-primaryColor text-white rounded mr-[20px] border-none font-bold py-[4px] px-[10px] hover:opacity-70"
                                    onClick={loginWithRedirect}>
                                Login
                            </button>}
                    </div>
                </div>
            </nav>
        </>

    )

}
import React from 'react';
import './style/menuBar.css'

interface MenuBarProps {
    setMenuItem: Function,
    menuItem: string
}

export const MenuBar: React.FC<MenuBarProps> = ({children, setMenuItem, menuItem}) => {
    return (
        <div className="menuBarContainer">
            <ul className="nav menuBar">
                {(children as string[]).map(child => <li key={child} className="nav-item" onClick={() => setMenuItem(child)}>
                    <a className={(menuItem === child) ? 'nav-link active' : 'nav-link'} aria-current="page"
                       href="/#">{child}</a>
                </li>)}
            </ul>
        </div>

    )

}
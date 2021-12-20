import React from 'react';

interface MenuBarProps {
    setMenuItem: Function,
    menuItem: string
}

export const MenuBar: React.FC<MenuBarProps> = ({children, setMenuItem, menuItem}) => {
    return (
        <ul className="nav">
            {(children as string[]).map(child => <li className="nav-item" onClick={() => setMenuItem(child)}>
                <a className={(menuItem === child) ? 'nav-link active' : 'nav-link'} aria-current="page"
                   href="#">{child}</a>
            </li>)}
        </ul>
    )

}
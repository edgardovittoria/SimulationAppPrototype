import React from 'react';
import css from './menuBar.module.css'

interface MenuBarProps {
    setMenuItem: Function,
    activeMenuItem: string,
    menuItems: string[]
}

export const MenuBar: React.FC<MenuBarProps> = ({menuItems, setMenuItem, activeMenuItem}) => {
    return (
        <div className={css.menuBarContainer}>
            <ul className={`nav ${css.menuBar}`}>
                {(menuItems as string[]).map(item => <li key={item} className="nav-item" onClick={() => setMenuItem(item)}>
                    <a className={(activeMenuItem === item) ? 'nav-link active' : 'nav-link'} aria-current="page"
                       href="/#">{item}</a>
                </li>)}
            </ul>
        </div>

    )
}


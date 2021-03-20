import React from 'react';
import '../../StyleSheet/SideBarLayout.css';

const SideBarLayout = ({Icon, text}) => {
    return (
        <div className="SideBar__Layout">
            <Icon />
            <h4 className="SideBar__LayoutText">{text}</h4>
        </div>
    )
}

export default SideBarLayout

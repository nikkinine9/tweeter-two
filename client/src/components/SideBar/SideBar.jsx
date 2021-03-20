import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import TwitterIcon from '@material-ui/icons/Twitter';
import ExplicitIcon from '@material-ui/icons/Explicit';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SideBarLayout from './SideBarLayout';
import '../../StyleSheet/SideBar.css';

const Sidebar = () => {
    return (
        <div className="SideBar__container">
            <div className="SideBar_TwitterIcon">
                <TwitterIcon className="SideBar__TwitterIcon" />
            </div>
            <div className="SideBar">
                <SideBarLayout Icon={HomeIcon} text={`Home`}/>
                <SideBarLayout Icon={ExplicitIcon} text={`Explore`}/>
                <SideBarLayout Icon={NotificationsIcon} text={`Notifications`}/>
                <SideBarLayout Icon={EmailIcon} text={`Messages`}/>
                <SideBarLayout Icon={BookmarkBorderIcon} text={`Bookmarks`}/>
                <SideBarLayout Icon={ReceiptIcon} text={`List`}/>
                <SideBarLayout Icon={PersonIcon} text={`Profile`}/>
                <SideBarLayout Icon={MoreHorizIcon} text={`More`}/>
            </div>
        </div>
    )
}

export default Sidebar

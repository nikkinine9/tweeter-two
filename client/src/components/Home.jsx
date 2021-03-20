import React from 'react'
import SideBar from './SideBar/SideBar';
import HomeFeed from './HomeFeed';
import Trends from './Trends';
import '../StyleSheet/Home.css';

const Home = () => {
    return (
        <div className="Home__container">
            <SideBar />
            <HomeFeed />
            <Trends />
        </div>
    )
}

export default Home

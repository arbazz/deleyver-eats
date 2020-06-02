import React, { useState } from 'react';
import AdminNav from './AdminNav';
import SideBar from './SideBar';
import List from './List';
import Resturnats from './Resturant';
import Riders from './Rider';

import './style.css';

export default function Home (){
    const [dashborad, setDashborad] = useState(false);
    const [resturants, setResturants] = useState(true); 
    const [riders, setRiders] = useState(false);

    return(
        <div>
            <AdminNav/>
            <div className="contianer-fluid">
                <div className="mian-admin-home-contianer blue-grey lighten-5">
                <SideBar 
                setDashborad={setDashborad}
                setResturants={setResturants}
                setRiders={setRiders}
                 />

                {dashborad && <List/>}
                {resturants && <Resturnats />}
                {riders && <Riders/>}
                </div>
            </div>
        </div>
    )
}
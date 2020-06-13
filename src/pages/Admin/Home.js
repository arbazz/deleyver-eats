import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import SideBar from './SideBar';
import List from './List';
import Resturnats from './Resturant';
import Riders from './Rider';
import Charge from './Charge';
import { getAllResturants } from '../../firebase/index';

import './style.css';

export default function Home (){
    const [dashborad, setDashborad] = useState(true);
    const [resturants, setResturants] = useState(false); 
    const [riders, setRiders] = useState(false);
    const [charge, setCharge] = useState(false);
    const [resturantsData , setResturantsData] = useState([]);
    const [ridersData, setRidersData] = useState([]);
    let useCall = false;
    useEffect(() => {
        fetchFromFire();
    },[useCall])

    const fetchFromFire = async() => {
        const resturants = await getAllResturants();

        let filteredArrayOfResturants = [];
        let filteredArrayOfRiders = [];
        for (let i=0; i<resturants.length; i++){
            if(resturants[i].data.rest === true){
                filteredArrayOfResturants.push(resturants[i]);
            }else{
                filteredArrayOfRiders.push(resturants[i]);
            }
        }
        // console.log(filteredArrayOfRiders);

        setResturantsData(filteredArrayOfResturants);
        setRidersData(filteredArrayOfRiders);
    }
    return(
        <div>
            <AdminNav/>
            <div className="contianer-fluid">
                <div className="mian-admin-home-contianer blue-grey lighten-5">
                <SideBar 
                setDashborad={setDashborad}
                setResturants={setResturants}
                setRiders={setRiders}
                setCharge={setCharge}
                 />

                {dashborad && <List resturants={resturantsData} riders={ridersData}/>}
                {resturants && <Resturnats  resturants={resturantsData}/>}
                {riders && <Riders riders={ ridersData}/>}
                {charge && <Charge/>}
                </div>
            </div>
        </div>
    )
}
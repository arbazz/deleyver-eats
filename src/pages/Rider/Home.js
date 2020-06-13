import React, { useState, useEffect } from 'react';
import RiderNav from './RiderNav';
import SideBar from './SideBar'
import './style.css'
import Requests from './Requests';
import ActiveRequest from './ActiveRequest';
import Earninig from './Earninig';
import ActiveRequestPage from './ActiveRequestPage';
import NewRequest from './NewRequest';
import { getRequestForRider } from '../../firebase/index'; 

export default function RiderHome() {
    const [dashboard, setDashboard] = useState(false);
    const [activeRequest, setActiveRequest] = useState(true);
    const [newRequest, setNewRequest] = useState(false);
    const [pendingRequest, setPendingRequest] = useState([]);

    useEffect(() => {
        fetchAllPendingRequest();
    },[])

    const fetchAllPendingRequest =  async() => {
        const res = await getRequestForRider();
        setPendingRequest(res);
        // console.log(res);
    }

    return (
        <div>
            <RiderNav />
            <div className="contianer-fluid">
                <div className="mian-admin-home-contianer blue-grey lighten-5" >
                    <SideBar 
                        setDashborad={setDashboard}
                        setActiveRequest={setActiveRequest}
                        setNewRequest={setNewRequest}
                    />

                    {dashboard && <div>
                        <Earninig />
                        <ActiveRequest />
                        <Requests requests={pendingRequest}/>
                    </div>}

                    {activeRequest && <ActiveRequestPage />}
                    {newRequest && <NewRequest requests={pendingRequest}/>}

                </div>
            </div>
        </div>
    )
}
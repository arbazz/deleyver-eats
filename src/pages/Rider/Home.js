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
import { checkuser, getUserInfo, } from '../../firebase/index';
import Setting from './Setting';

export default function RiderHome() {
    const [dashboard, setDashboard] = useState(true);
    const [activeRequest, setActiveRequest] = useState(false);
    const [newRequest, setNewRequest] = useState(false);
    const [setting, setSetting] = useState(false)

    const [pendingRequest, setPendingRequest] = useState([]);
    
    const [userData, setUserData] = useState("");


    useEffect(() => {
        fetchAllPendingRequest();
    }, [userData])

    const fetchAllPendingRequest = async () => {
        const res = await getRequestForRider();
        setPendingRequest(res);
        // console.log(res);
        const userId = await checkuser();
        const user = await getUserInfo(userId.uid);
        // console.log(user);
        setUserData(user);
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
                        setSetting={setSetting}
                    />

                    {dashboard && <div>
                        <Earninig userData={userData} />
                        <ActiveRequest />
                        <Requests requests={pendingRequest} />
                    </div>}

                    {activeRequest && <ActiveRequestPage />}
                    {newRequest && <NewRequest requests={pendingRequest} />}
                    {setting && <Setting requests={pendingRequest} />}

                </div>
            </div>
        </div>
    )
}
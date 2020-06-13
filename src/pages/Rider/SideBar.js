import React from 'react';


export default function SideBar({setDashborad, setActiveRequest, setNewRequest, setCharge}) {

    const handleDashboard = () => {
        setDashborad(true);
        setActiveRequest(false);
        setNewRequest(false)
    }

    const handleResturants = () => {
        setDashborad(false);
        setNewRequest(false)
        setActiveRequest(true)
    }

    const handleNewRequest = () => {
        setNewRequest(true)
        setDashborad(false)
        setActiveRequest(false)
    }

    return (
        <div className="admin-main-side-container blue darken-3">
            <div className="main-container-of-btn-side-amdin" onClick={handleDashboard}>
                <i className="material-icons icon-admin-side-main">dashboard</i>
                <p className="side-admin-btn-bar">Dashboard</p>
            </div>
            <div className="main-container-of-btn-side-amdin" onClick={handleResturants}>
                <i className="material-icons icon-admin-side-main">local_library</i>
                <p className="side-admin-btn-bar">Active Request</p>
            </div>
            <div className="main-container-of-btn-side-amdin" onClick={handleNewRequest}>
                <i className="material-icons icon-admin-side-main rider-icon-admin-side">directions_bike</i>
                <p className="side-admin-btn-bar">New Request</p>
            </div>
            <div className="main-container-of-btn-side-amdin" >
                <i className="material-icons icon-admin-side-main rider-icon-admin-side">attach_money</i>
                <p className="side-admin-btn-bar">Charge</p>
            </div>
            <div className="main-container-of-btn-side-amdin">
                <i className="material-icons icon-admin-side-main rider-icon-admin-side-set">settings</i>
                <p className="side-admin-btn-bar">settings</p>
            </div>
        </div>
    )
}
import React from 'react';


export default function SideBar({setDashborad, setResturants, setRiders}) {

    const handleDashboard = () => {
        setDashborad(true);
        setResturants(false);
        setRiders(false);
    }

    const handleResturants = () => {
        setDashborad(false);
        setResturants(true)
        setRiders(false);
    }

    const handleRiders = () => {
        setRiders(true);
        setDashborad(false);
        setResturants(false)
    }

    return (
        <div className="admin-main-side-container">
            <div className="main-container-of-btn-side-amdin" onClick={handleDashboard}>
                <i className="material-icons icon-admin-side-main">dashboard</i>
                <p className="side-admin-btn-bar">Dashboard</p>
            </div>
            <div className="main-container-of-btn-side-amdin" onClick={handleResturants}>
                <i className="material-icons icon-admin-side-main">local_mall</i>
                <p className="side-admin-btn-bar">Resturants</p>
            </div>
            <div className="main-container-of-btn-side-amdin" onClick={handleRiders}>
                <i className="material-icons icon-admin-side-main rider-icon-admin-side">directions_bike</i>
                <p className="side-admin-btn-bar">Riders</p>
            </div>
            <div className="main-container-of-btn-side-amdin">
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
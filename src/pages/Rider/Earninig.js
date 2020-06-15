import React from 'react';
import { CircleLoader } from '../../components';


export default function Earnings({userData}) {
    if (!userData.data) {
        return (
            <div className="center">
                <CircleLoader />
            </div>
        )
    }
    return (
        <div className="main-admin-list-container">
            <h5>Earnings</h5>
            <div className=" card-eranoh-teo-row">

            <div className="second-list-admin-container">
                <div className="earning-card-main-rfier">
                    <p>Total Earnings</p>
                    <div className="secon-earnig-rder-card">
                    <h5 className="eraning-symbol-card-rider">€</h5>
                    <h5 className="price-daily-reaninig-card-text">{userData.data.wallet}</h5>
                    </div>
                </div>
            </div>
            {/* <div className="second-list-admin-container">
                <div className="earning-card-main-rfier">
                    <p>Weekly Earnings</p>
                    <div className="secon-earnig-rder-card">
                    <h5 className="eraning-symbol-card-rider">€</h5>
                    <h5 className="price-daily-reaninig-card-text">100</h5>
                    </div>
                </div>
            </div> */}
            </div>
        </div>
    )
}
import React from 'react';
import './style.css'
import { primaryColor } from '../../config/theme';


function EarnCard() {
    return (
        <div style={{ backgroundColor: primaryColor }} className="earn-card-main-contaienr">
            <div className="container">
                <div className="earn-card-sec-cont z-depth-5">
                <h4>Become a rider and get paid</h4>
                <p>Drive on the platform with the largest network of active riders.</p>
                <a className="waves-effect waves-light btn blue accent-1">Register now</a>
                <p>Learn More</p>
                </div>
            </div>
        </div>
    );
}

export default EarnCard;

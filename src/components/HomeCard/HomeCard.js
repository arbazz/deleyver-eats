import React, { useState } from 'react';
import './style.css'
import { primaryColor } from '../../config/theme'

export default function HomeCard() {

    return (
        <>
            <div className="background-home-card" style={{backgroundColor: primaryColor}}>
                <div className="contianer">
                    <div className="row card-home-actual-contaienr">
                        <div className="col s4 card-home-actual z-depth-4">
                            <img src={require("../../assets/images/Untitled-3.png")} className="image-actual-card"/>
                            <h4 className="card-actual-home-title" style={{color: primaryColor}}>Online Food Ordering</h4>
                            <p className="actual-card-tdex">cutom content with details of the given services.</p>
                        </div>
                        <div className="col s4 card-home-actual z-depth-4">
                            <img src={require("../../assets/images/Untitled-4.png")} className="image-actual-card"/>
                            <h4 className="card-actual-home-title" style={{color: primaryColor}}>Food Delievery</h4>
                            <p className="actual-card-tdex">cutom content with details of the given services.</p>
                        </div>
                        <div className="col s4 card-home-actual z-depth-4 adjust-home-card">
                            <img src={require("../../assets/images/Untitled-5.png")} className="image-actual-card"/>
                            <h4 className="card-actual-home-title" style={{color: primaryColor}}>Fast Delievery</h4>
                            <p className="actual-card-tdex">cutom content with details of the given services.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
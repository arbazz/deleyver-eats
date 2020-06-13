import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Switch from "react-switch";

export default function RiderNav() {
    const [checked, setChecked] = useState(true)
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to="home" className="brand-logo" style={{ paddingLeft: 10, color: "royalBlue" }}>Delyver Eats</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className="swithc-rider">
                        <Switch onChange={()=>setChecked(u => !u)} checked={checked} />
                    </li>
                    <li>
                    <i className="large material-icons" style={{ paddingRight: 30, color: "royalBlue" }}>account_circle</i>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
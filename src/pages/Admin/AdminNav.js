import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminNav() {

    return (
        <nav>
            <div className="nav-wrapper light-blue accent-4">
                <Link to="home" className="brand-logo" style={{paddingLeft: 10}}>Delyver Eats</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {/* <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li> */}
                    <li style={{paddingRight: 20}}>Welcome Admin</li>
                </ul>
            </div>
        </nav>
    )
}
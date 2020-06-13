import React, { useEffect } from 'react';
import './style.css'
import { Link } from 'react-router-dom';


function SimpleNav() {
 
    return (
        <div className="simple-nav-main-container">
            <Link to="/" className="simple-nav-text-logo">Delyver Eats</Link>
        </div>
        
    );
}

export default SimpleNav;

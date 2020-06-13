import React from 'react';
import './style.css'
import { primaryColor } from '../../config/theme'

export default function CopyRight() {
    return (
        <footer className="footer-copy-container" style={{backgroundColor: primaryColor}}> 
            <p>© 2020 Delyver Eats Inc.</p>
        </footer>
    )
}
import React, {useState} from 'react';
import './style.css'
import { primaryColor } from '../../config/theme'
import { Link } from "react-router-dom";

export default function NavBar() {
    const [isShow, setIsShow] = useState("none");
    const openSideNav = () => {
        if(isShow === "none"){
            setIsShow("block")
        }else{
            setIsShow("none")
        }
    }
    return (
        <>
            <nav>
                <div className="nav-wrapper" style={{ backgroundColor: primaryColor }}>
                    <div className="container">
                        <Link to="/" className="brand-logo">Delyver Eats</Link>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons" onClick={openSideNav}>menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="register-rider" className="waves-effect waves-light btn blue darken-1 z-depth-0">Become a Rider <i className="material-icons left ">directions_bike</i></Link></li>
                            <li><Link to="/login" className="waves-effect waves-light btn indigo darken-2 z-depth-0">Request a delivery</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <ul className="sidenavs" id="sideBar" style={{ backgroundColor: primaryColor, display: isShow }}>
                <div className="contaienr">
                    <li className="nav-li"><Link to="register-rider" className="link-text">Become a Rider</Link></li>
                    <li className="nav-li"><Link to="/login" className="link-text">Request a delivery</Link></li>
                </div>
            </ul>

        </>
    )
}
import React, { useState } from 'react';
import './style.css'
import { primaryColor } from '../../config/theme'
import { Link } from "react-router-dom";

export default function NavBar({ user, themFromThisRest, signOut }) {
    const [isShow, setIsShow] = useState("none");
    const openSideNav = () => {
        if (isShow === "none") {
            setIsShow("block")
        } else {
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
                            {!user &&
                                <>
                                    <li><Link to="register-rider" className="waves-effect waves-light btn blue darken-1 z-depth-0">Become a Rider <i className="material-icons left ">directions_bike</i></Link></li>
                                    <li><Link to="/login" className="waves-effect waves-light btn indigo darken-2 z-depth-0">Request a delivery</Link></li>
                                </>}
                            {user && <li><Link to="/resturant-home"> <i className="material-icons">account_circle</i>  </Link></li>}
                        </ul>
                    </div>
                </div>
            </nav>

            <ul className="sidenavs" id="sideBar" style={{ backgroundColor: primaryColor, display: isShow }}>
                {!user && <div className="contaienr">
                    <li className="nav-li"><Link to="register-rider" className="link-text">Become a Rider</Link></li>
                    <li className="nav-li"><Link to="/login" className="link-text">Request a delivery</Link></li>
                </div>}
                {user && <div className="container">

                    <div className="icon-cont-resgt-main">
                        <i className="material-icons icon-cla-main-rest-home white-text">history</i>
                        <p className="hoverer-main-rest-home  white-text"
                            onClick={() => { themFromThisRest.setState({ orderHistory: true, createRequest: false, customers: false, notidications: false, wallet: false, promotions: false }) }}>
                            Order History</p>
                    </div>

                    <div className="icon-cont-resgt-main">
                        <i className="material-icons icon-cla-main-rest-home white-text">create_new_folder</i>
                        <p className="hoverer-main-rest-home   white-text"
                            onClick={() => { themFromThisRest.setState({ createRequest: true, orderHistory: false, customers: false, notidications: false, wallet: false, promotions: false }) }}>
                            Create request</p>
                    </div>

                    <div className="icon-cont-resgt-main">
                        <i className="material-icons icon-cla-main-rest-home white-text">supervisor_account</i>
                        <p className="hoverer-main-rest-home  white-text"
                            onClick={() => { themFromThisRest.setState({ createRequest: false, orderHistory: false, customers: true, notidications: false, wallet: false, promotions: false }) }}>
                            Customers</p>
                    </div>

                    <div className="icon-cont-resgt-main">
                        <i className="material-icons icon-cla-main-rest-home white-text">notifications</i>
                        <p className="hoverer-main-rest-home  white-text"
                            onClick={() => { themFromThisRest.setState({ createRequest: false, orderHistory: false, customers: false, notidications: true, wallet: false, promotions: false }) }}>
                            Notificatios</p>
                    </div>

                    <div className="icon-cont-resgt-main">
                        <i className="material-icons icon-cla-main-rest-home white-text">account_balance_wallet</i>
                        <p className="hoverer-main-rest-home  white-text"
                            onClick={() => { themFromThisRest.setState({ createRequest: false, orderHistory: false, customers: false, notidications: false, wallet: true, promotions: false }) }}>
                            Wallet</p>
                    </div>

                    <div className="icon-cont-resgt-main">
                        <i className="material-icons icon-cla-main-rest-home white-text">monetization_on</i>
                        <p className="hoverer-main-rest-home  white-text"
                            onClick={() => { themFromThisRest.setState({ createRequest: false, orderHistory: false, customers: false, notidications: false, wallet: false, promotions: true }) }}>
                            Promotions</p>
                    </div>

                    <a className="waves-effect waves-light btn deep-purple"  
                                        onClick={()=>signOut()}
                                        style={{marginTop: 30, marginBottom: 30}}>Log out</a>

                </div>}
            </ul>

        </>
    )
}
import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { NavBar, CircleLoader } from '../../components/index';
import OrderHistory from './OrderHistory';
import CreateRequest from './CreateRequest'
import Customers from './Customers';
import Notificatios from './Notifications';
import Wallet from './Wallet';
import Promotions from './Promotios';
import { getOrderForResturant, getCustomers, getUserInfo, signOut } from '../../firebase/index';

class ResturnatHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orderHistory: true,
            createRequest: false,
            customers: false,
            notidications: false,
            wallet: false,
            promotions: false,
            orders: [],
            cus: [],
            user: []
        }
    }

    async componentDidMount() {
        const uid = localStorage.getItem("uid");
        if(!uid){
            this.props.history.push("/home");
        }else{
            const res = await getOrderForResturant(uid);
            const cus = await getCustomers(uid);
            const user = await getUserInfo(uid);
            this.setState({ loading: false, orders: res, cus, user });
        }

    }

    handleSignout = async() => {
        const res = await signOut();
        if(res === "true"){
            window.localStorage.clear();
            window.location.reload(false)
        }
    }

    render() {
        const { user, loading, orderHistory, createRequest, customers, notidications, wallet, promotions } = this.state;
        return (
            <>
                {!loading ? <>
                    <NavBar user={user} themFromThisRest={this} signOut={this.handleSignout}/>
                    <div className="">
                        <div className="row welcome-main-rest-home">
                            <div className="col s12 cont-rest-home-welcome">
                <p className="welcome-text-home-welcome">Welcome {user.data.name}</p>
                            </div>
                        </div>
                        <div className="main-cont-rest-home">
                            <div className="contaienr-rest-home-main-widhte">

                                <div className="profile-main-rest-home z-depth-1">
                                    <div className="cirlce-main-rest-home">
                                        <p>WN</p>
                                    </div>
                                    <p className="name-text-main-rest-home">{user.data.name}</p>
                                    <p className="email-main-rest-home">{user.data.email}</p>
                                    <p className="main-rest-home-number">{user.data.number}</p>
                                    <div className="main-rest-home-setting-seconf">

                                        <div className="icon-cont-resgt-main">
                                            <i className="material-icons icon-cla-main-rest-home">history</i>
                                            <p className="hoverer-main-rest-home"
                                                onClick={() => { this.setState({ orderHistory: true, createRequest: false, customers: false, notidications: false, wallet: false, promotions: false }) }}>
                                                Order History</p>
                                        </div>

                                        <div className="icon-cont-resgt-main">
                                            <i className="material-icons icon-cla-main-rest-home">create_new_folder</i>
                                            <p className="hoverer-main-rest-home"
                                                onClick={() => { this.setState({ createRequest: true, orderHistory: false, customers: false, notidications: false, wallet: false, promotions: false }) }}>
                                                Create request</p>
                                        </div>

                                        <div className="icon-cont-resgt-main">
                                            <i className="material-icons icon-cla-main-rest-home">supervisor_account</i>
                                            <p className="hoverer-main-rest-home"
                                                onClick={() => { this.setState({ createRequest: false, orderHistory: false, customers: true, notidications: false, wallet: false, promotions: false }) }}>
                                                Customers</p>
                                        </div>

                                        <div className="icon-cont-resgt-main">
                                            <i className="material-icons icon-cla-main-rest-home">notifications</i>
                                            <p className="hoverer-main-rest-home"
                                                onClick={() => { this.setState({ createRequest: false, orderHistory: false, customers: false, notidications: true, wallet: false, promotions: false }) }}>
                                                Notificatios</p>
                                        </div>

                                        <div className="icon-cont-resgt-main">
                                            <i className="material-icons icon-cla-main-rest-home">account_balance_wallet</i>
                                            <p className="hoverer-main-rest-home"
                                                onClick={() => { this.setState({ createRequest: false, orderHistory: false, customers: false, notidications: false, wallet: true, promotions: false }) }}>
                                                Wallet</p>
                                        </div>

                                        <div className="icon-cont-resgt-main">
                                            <i className="material-icons icon-cla-main-rest-home">monetization_on</i>
                                            <p className="hoverer-main-rest-home"
                                                onClick={() => { this.setState({ createRequest: false, orderHistory: false, customers: false, notidications: false, wallet: false, promotions: true }) }}>
                                                Promotions</p>
                                        </div>

                                        <a className="waves-effect waves-light btn deep-purple" 
                                        onClick={this.handleSignout}
                                        style={{marginTop: 30}}>Log out</a>
                                    </div>
                                </div>

                                {orderHistory && <OrderHistory props={this.state.orders} />}
                                {createRequest && <CreateRequest cus={this.state.cus} />}
                                {customers && <Customers props={this.state.cus} />}
                                {notidications && <Notificatios />}
                                {wallet && <Wallet user={user}/>}
                                {promotions && <Promotions />}

                            </div>
                        </div>
                    </div>
                </> : <div className="loader-doc-main"><CircleLoader /></div>}
            </>
        )
    }
}

export default ResturnatHome;
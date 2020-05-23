import React from 'react'
import { SimpleNav } from '../../components/index'
import "./style.css"
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        const {loading} = this.state
        return (
            <>
                <div className="login-main-container">
                    <img src={require("../../assets/images/Blue-Ridge.jpg")} className="login-image-cover" />
                    <div className="login-second-form-container">
                        <div className="login-dont-account">
                            <p>Don't have an account?</p>
                            <Link to="signup-resturant" className="waves-effect waves-light btn login-signup-don-btn purple darken-2">Sign up</Link>
                        </div>
                        <div className="form-login-contgainer">
                            <h5 className="heading-login">Log in to Delyver eats</h5>
                            <div className="row login-input">
                                <div className="input-field col s12 ">
                                    <input id="email" type="email" className="validate" />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row login-input">
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="validate" />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row forge-submit-login">
                                <div className="col s6 forget-pass-login">
                                    {/* <Link>Forget password</Link> */}
                                </div>
                                <div className="col s6  login-login-button-contaienr">
                                    {!loading && <button className="btn waves-effect waves-light blue darken-1" type="submit" name="action">Login
                                      <i className="material-icons right login-login-button ">send</i>
                                    </button>}
                                    {loading && <div className="progress loading-login">
                                        <div className="indeterminate"></div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;

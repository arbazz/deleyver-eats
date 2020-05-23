import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {signup, saveRestUser, checkuser } from '../../firebase/index';


class ResturantSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            isdis: true,
            password: '',
            update: false,
            next: false,
            name: '',
            city: '',
            phone: ''
        }
    }

    componentDidUpdate(){
        const {email, password, update, name, country, phone} = this.state;
        if(email && password.length >= 8 && !update){
            this.setState({isdis: false, update: true})
        }
        if(name && country && phone && !update){
            this.setState({isdis: false, update: true})
        }
    }

    handleNext = () =>[
        this.setState({next: true, update: false})
    ]
    
    handleSignup = async() =>{
        this.setState({loading: true});
        const {email, password, name, city, phone} = this.state;
        if(name && city && phone){
            const res = await signup(email, password);
            console.log(res);
            if(res !== "false"){
                this.setState({loading: false});
                alert("error " + res)
            }else{
                const user = await checkuser();
                saveRestUser(user, email, name, phone, city);
                localStorage.setItem("uid", user.uid);
                localStorage.setItem("number", phone);
                this.props.history.push("/optp");
            }
        }else{
            alert("all fields are required")
        }
    }

    render() {
        const {loading, email, isdis, password, next,name, city, phone} = this.state
        return(
        <>
        <div className="login-main-container">
            <div className="login-second-form-container">
                <div className="login-dont-account">
                    <p>Have an account?</p>
                    <Link to="login" className="waves-effect waves-light btn login-signup-don-btn purple darken-2">Log in</Link>
                </div>
                {!next && <div className="form-login-contgainer">
                    <h5 className="heading-login">Sing up to Delyver eats</h5>
                    <p>Let's get you started</p>
                    <div className="row login-input">
                        <div className="input-field col s6 ">
                            <input id="email" type="email" className="validate" value={email} 
                            onChange={(e)=>{this.setState({email: e.target.value})}}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="password" type="password" className="validate" value={password} 
                            onChange={(e)=>{this.setState({password: e.target.value})}}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row forge-submit-login">
                        <div className="col s6 forget-pass-login">
                            {/* <Link>Forget password</Link> */}
                        </div>
                        <div className="col s6  login-login-button-contaienr">
                            {!loading && <button className="btn waves-effect waves-light blue darken-1" 
                            onClick={this.handleNext}  disabled={isdis} type="submit" name="action">Next
                              <i className="material-icons right login-login-button ">send</i>
                            </button>}
                            {loading && <div className="progress loading-login">
                                <div className="indeterminate"></div>
                            </div>}
                        </div>
                    </div>
                </div>}

                {next && <div className="form-login-contgainer">
                    <h5 className="heading-login">Your resturants</h5>
                    <div className="row login-input">
                        <div className="input-field col s12 ">
                            <input id="name" type="text" className="validate" value={name} 
                            onChange={(e)=>{this.setState({name: e.target.value})}}/>
                            <label htmlFor="name">Restrant Name</label>
                        </div>
                    </div>
                    <div className="row login-input">
                        <div className="input-field col s6 ">
                            <input  type="text" className="validate" value={phone} 
                            onChange={(e)=>{this.setState({phone: e.target.value})}}/>
                            <label htmlFor="Phone">Phone</label>
                        </div>
                        <div className="input-field col s6 ">
                            <input  type="text" className="validate" value={city} 
                            onChange={(e)=>{this.setState({city: e.target.value})}}/>
                            <label htmlFor="Country">City</label>
                        </div>
                    </div>
                    <div className="row forge-submit-login">
                        <div className="col s6 back-sgin-up-rest">
                            <p onClick={() => {this.setState({next: false})}}>back</p>
                        </div>
                        <div className="col s6  login-login-button-contaienr">
                            {!loading && <button className="btn waves-effect waves-light blue darken-1" 
                            onClick={this.handleSignup}  disabled={isdis} type="submit" name="action">Sign up
                              <i className="material-icons right login-login-button ">send</i>
                            </button>}
                            {loading && <div className="progress loading-login">
                                <div className="indeterminate"></div>
                            </div>}
                        </div>
                    </div>
                </div>}

            </div>
            <div className="image-cont-rest-sign-up">
                <img src={require("../../assets/images/logo.jpeg")} className="image-sign-up-rest"/>
            </div>
        </div>
    </>
        )
    }
}

export default ResturantSignup;
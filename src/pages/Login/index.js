import React from 'react'
import { SimpleNav } from '../../components/index'
import "./style.css"
import { Link } from 'react-router-dom';
import { signIn, getUserInfo, checkuser } from '../../firebase/index';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            err: ''
        }
    }


    handleLogin = async() => {
        const {email, password} = this.state;
        console.log(email, password);
        this.setState({loading: true, err: ''})
        if(email && password){
            const res = await signIn(email, password);
            console.log("",res);
            if(res !== "false"){
                console.log(res);
                this.setState({loading:false, err: res})
            }else{
                const res = await checkuser();
                localStorage.setItem("uid", res.uid);
                const ress = await getUserInfo(res.uid);
                localStorage.setItem("docId", ress.docId);
                console.log(ress);
                if(ress.data.rest){
                    // alert("you are rest");
                    this.props.history.push("/resturant-home");
                }else{
                    // alert("you are rider");
                    if(ress.data.pending){
                        this.props.history.push("/documents");
                    }else{
                        this.props.history.push("/rider-home");
                    }

                }
            }
        }        
    }

    render() {
        const {loading, err} = this.state
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
                                    <input id="email" type="email" className="validate" onChange={e=>this.setState({email: e.target.value})}/>
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row login-input">
                                <div className="input-field col s12">
                                    <input id="password" type="password" className="validate" onChange={e=>this.setState({password: e.target.value})}/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row forge-submit-login">
                                <div className="col s6 forget-pass-login">
                                    {/* <Link>Forget password</Link> */}
                                </div>
                                <div className="col s6  login-login-button-contaienr">
                                    {!loading && <button className="btn waves-effect waves-light blue darken-1" 
                                    onClick={this.handleLogin} type="submit" name="action">Login
                                      <i className="material-icons right login-login-button ">send</i>
                                    </button>}
                                    {loading && <div className="progress loading-login">
                                        <div className="indeterminate"></div>
                                    </div>}
                                </div>
                            </div>
                                  {err &&  <p className="err-login-rest-rid margin-0">{err}</p>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;

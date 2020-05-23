import React, { useEffect } from 'react';
import './style.css'
import { CopyRight, SimpleNav, CircleLoader } from '../../components/index';
import firebase from '../../firebase/index'
import {  getUserInfo, updateNumber } from '../../firebase/index'

class Optp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '03051245319',
            isSend: true,
            error: false,
            isDisabled: true,
            code: '',
            loading: false,
            isFecthing: true,
            info: ''
        }
    }

   async componentDidMount() {
        const uid = localStorage.getItem("uid");
        const number = localStorage.getItem("number");
        const info = await getUserInfo(uid);
        if(!uid){
            this.props.history.push("/home");
        }else{
            this.setState({isFecthing: false, number, info})
        }
    };

    handleSignUp = event => {
        console.log(this.state.number)
        const that = this;
        this.setState({ loading: true })
        event.preventDefault();
        window.appVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible"
            }
        );
        const appVerifier = window.appVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(this.state.number, appVerifier)
            .then(function (confirmationResult) {
                console.log("Success");
                that.setState({
                    isSend: false
                })
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
            })
            .catch(function (error) {
                console.log("Error:" + error);
                that.setState({ error: true, errorMessage: "Error:" + error.code, loading: false })
            });
    };
    onVerifyCodeSubmit = event => {
        const { info, number } = this.state;
        event.preventDefault();
        const verificationId = this.state.code;
        window.confirmationResult
            .confirm(verificationId)
            .then(function (result) {
                // User signed in successfully.
                var user = result.user;
                user.getIdToken().then(idToken => {
                    console.log(idToken);
                    if(info){
                        updateNumber(number, info.docId, idToken).then(() => {
                            alert("sucess");
                        })
                    }else{
                        alert("something went wrong try again!")
                    }
                });
            })
            .catch(function (error) {
                // User couldn't sign in (bad verification code?)
                console.error("Error while checking the verification code", error);
                window.alert(
                    "Error while checking the verification code:\n\n" +
                    error.code +
                    "\n\n" +
                    error.message
                );
            });
    }
    render() {
        const { isSend, number, error, errorMessage, isDisabled, loading, isFecthing } = this.state;
        return (
            <>
                <div id="recaptcha-container"></div>
               
                <div className="phone-auth-otp-main-caontainer">
                    <SimpleNav />
                        {isFecthing && <div className="cirlce-loading-center"><CircleLoader/></div>}
                  {!isFecthing &&  <div className="phone-auth-code-enter-main-container z-depth-3">
                        {!isSend ? <>
                            <p className="margin-0 two-step-otp">Two step verification</p>
                            <p className="margin-0">Please Enter the code sent to your number </p>
                            <p className="margin-0 optp-digi-prompt"><b>Enter six digit verification code</b></p>
                            <input className="input-optp-enter-digits" onChange={(e) => { this.setState({ code: e.target.value }) }} />
                            <a className="waves-effect waves-light btn another-optp-button-submit" onClick={this.onVerifyCodeSubmit}>Submit</a>
                        </> :
                            <>
                                <p className="margin-0">Phone Number</p>
                                <input value={number} disabled={isDisabled} onChange={(e) => { this.setState({ number: e.target.value }) }} /> <span className="edit-text-optop" onClick={() => { this.setState({ isDisabled: false }) }}>Edit</span>
                                {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                <p>verification code will be sent to your number.</p>
                                <a className="waves-effect waves-light btn another-optp-button-submit" onClick={this.handleSignUp}>send verification code</a>
                                {loading && <div class="progress">
                                    <div class="indeterminate"></div>
                                </div>}
                            </>}
                    </div>}

                    <div>
                        <CopyRight />
                    </div>
                </div>
            </>

        );
    }
}

export default Optp;

import React from 'react';
import './style.css'
import { primaryColor } from '../../config/theme';
import { NavBar, CopyRight } from '../../components/index'
import { signup, checkuser, saveuser } from '../../firebase/index'


class REgisterRider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            last_name: '',
            first_name: '',
            number: '',
            password: '',
            city: '',
            req: false,
            err: "All Fields are required",
            isloading: false
        }

    }

    handleValues = (e) => {
        // console.log(e.target.value)
        // console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleNext = async () => {
        const { email, last_name, first_name, number, password, city, isloading } = this.state;
        if (email && last_name && first_name && number && password && city) {
            this.setState({ req: false, isloading: true });
            const result = await signup(email, password);
            console.log(result)
            if (result !== "false") {
                this.setState({ req: true, err: result, isloading: false });
            } else if (result === "false") {
                const user = await checkuser();
                saveuser(user, email, last_name, first_name, number, city);
                localStorage.setItem("uid", user.uid);
                localStorage.setItem("number", number);
                this.props.history.push("/optp");
            }

            // console.log("user",user)
        } else {
            this.setState({ req: true })
        }
    }
    render() {
        const { req, err, isloading } = this.state;
        return (
            <>
                <NavBar />
                <div className="container reg-rider-main-container">
                    <div className="row">
                        <div className="col s12 m6">
                            <p className="reg-rider-main-text-1">Rider with Delyver Eats</p>
                            <p className="reg-rider-main-text-1">Make Money on your schedule</p>
                        </div>
                        {/* form contaeinr */}
                        <div className="col s12 m6 reg-rider-form-main-contianer z-depth-2">
                            <div className="reg-roder-second-cont">
                                <h5 className="reg-rider-sign-up-text">Sign up now</h5>

                                <div className="row">

                                    <div className="input-field col s6">
                                        <input
                                            onChange={(e) => this.handleValues(e)}
                                            placeholder="Enter first name..." id="first_name" type="text" className="validate" />
                                        <label htmlFor="first_name">First Name</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input
                                            onChange={(e) => this.handleValues(e)}
                                            placeholder="Enter last name..." id="last_name" type="text" className="validate" />
                                        <label htmlFor="first_name">Last Name</label>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col s12 input-field">
                                        <input
                                            onChange={(e) => this.handleValues(e)}
                                            placeholder="Enter Email..." id="email" type="email" className="validate" />
                                        <label htmlFor="first_name">Email</label>
                                        <span className="helper-text" data-error="Wrong Email Format" data-success="right"></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <input
                                            onChange={(e) => this.handleValues(e)}
                                            placeholder="Enter phoner number..." id="number" type="text" className="validate" />
                                        <label htmlFor="first_name">Phone</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input
                                            onChange={(e) => this.handleValues(e)}
                                            id="password" type="password" className="validate" />
                                        <label htmlFor="password">Create Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <input
                                            onChange={(e) => this.handleValues(e)}
                                            placeholder="Enter city..." id="city" type="text" className="validate" />
                                        <label htmlFor="first_name">City</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <p>By proceeding you are agreeing to our <span>Terms & conditions</span></p>
                                    </div>
                                </div>
                                {!!req && <div className="row">
                                    <div className="col s12">
                                        <p className="text-reg-rider-req">{err}</p>
                                    </div>
                                </div>}
                                {!isloading && <button onClick={this.handleNext} className="btn waves-effect waves-light reg-rdier-btn-next indigo" type="submit" name="action" style={{ fontWeight: 'bold' }}>Next
                               <i className="material-icons right">send</i>
                                </button>}
                               {!!isloading && <div className="progress">
                                    <div className="indeterminate"></div>
                                </div>
}
                            </div>
                        </div>
                        {/* --- fomr container end */}
                    </div>
                </div>
                {/* card contaienr */}
                <div className="container">
                    <h3>Ride When you want</h3>

                    <div className="row">

                        <div className="col s12 m4 rider-reg-bottom-cont">
                            <i className="material-icons large blue-text text-darken-2">attach_money</i>
                            <h5>Earn anytime anywhere</h5>
                            <p>Ride when and where you want. And choose how and when you want to get paid.</p>
                        </div>
                        <div className="col s12 m4 rider-reg-bottom-cont">
                            <i className="material-icons large blue-text text-darken-2">watch</i>
                            <h5>Set your own schedule</h5>
                            <p>Only drive when it works for you. There’s no office or boss. That means you’ll always start and stop on your time.</p>
                        </div>
                        <div className="col s12 m4 rider-reg-bottom-cont">
                            <i className="material-icons large blue-text text-darken-2">assignment_turned_in</i>
                            <h5>Signing up is easy</h5>
                            <p>Sign up to gain access to the app. After your account activation is complete, you can start earning.</p>
                        </div>

                    </div>

                </div>
                {/* --- card cotaiber enbd */}
                <CopyRight />
            </>

        );
    }
}

export default REgisterRider;

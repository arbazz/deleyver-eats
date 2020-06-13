import React, { useState } from 'react';
import { signIn } from '../../firebase/index';
import { useHistory } from "react-router-dom";

export default function Login() {
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [err, setErr] = useState("");

    const handleLogin = async () => {
        setLoading(true);
        console.log(email, password);
        if(email === "admin@delyvereats.com"){

            const res = await signIn(email, password);
            console.log(res);
            if (res === "false") {
                setLoading(false);
                history.push("/home-admin");
            } else {
                setLoading(false);
                setErr(res);
            }
        }else{
            setLoading(false);
            setErr(email + " email is not authorized")
        }   
    }
    return (
        <div className="login-main-admin-contianer">
            <h4 className="login-text-main-admin">Login</h4>
            <div className="login-admin-contienr">
                <div className="input-field input-cont-admin">
                    <input value={email} id="email" type="text" className="validate"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <label className="active" htmlFor="email">Email</label>
                </div>

                <div className="input-field">
                    <input value={password} id="email" type="password" className="validate"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <label className="active" htmlFor="password">password</label>
                </div>
                {!loading && <a className="waves-effect waves-light btn btn-admin-login" onClick={handleLogin}>Login</a>}
                {!!loading && <div className="progress prog-admin">
                    <div className="indeterminate"></div>
                </div>}
            </div>
                {!!err && <p className="white-text">{err}</p>}
        </div>
    )
}
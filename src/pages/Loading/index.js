import React, { useEffect } from 'react';
import './style.css'
import { useHistory } from "react-router-dom";


function Loading() {
    const history = useHistory();

    useEffect(() =>{
        setTimeout(() => {
            history.push("/home");
        }, 500)
    })

    return (
        <div className="container-loading">
            <h3 className="loading-heading">Delyver Eats</h3>

            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Loading;

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

            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Loading;

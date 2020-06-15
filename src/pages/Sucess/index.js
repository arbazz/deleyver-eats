import React, { useEffect, useState } from 'react'
import { NavBar, CircleLoader } from '../../components/index';
import './style.css';
import { url } from '../../config/theme';
import axios from 'axios';
import { checkuser, getUserInfo } from '../../firebase/index';
import { Link } from 'react-router-dom';

export default function Success() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let foo = params.get('session_id');

    const [suc, setSuc] = useState(false);

    useEffect(() => {
        fetchRequest()
    }, [])

    const fetchRequest = async() => {
        const user = await checkuser();
        const userInfo = await getUserInfo(user.uid);
        console.log(userInfo)
        return new Promise((resolve, reject)=> {
            axios.get(url + "checksuc?session_id=" + foo + "&docId=" + userInfo.docId, {
                session_id: foo
            })
                .then(function (response) {
                    resolve(response);
                    console.log(response)
                    if(response.data.payment_intent){
                        setSuc(true)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    resolve(error)
                });
        })
    }
    return (
        <>
            <NavBar />
            <div className="succes-red-page">
                <p>suceess</p>
                <div className="center">
                 {!suc  && <CircleLoader />}
                 {suc && <div>
                     <p>Payment Completed</p>
                     <button>
                         <Link to="/resturant-home">
                         Wallet
                         </Link>
                     </button>
                 </div>}
                </div>
            </div>
        </>
    )
}
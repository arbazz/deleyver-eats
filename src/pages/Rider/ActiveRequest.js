import React, { useEffect, useState } from 'react';
import { getActiveRequestForRider } from '../../firebase/index';
import { CircleLoader } from '../../components/index';
import { useHistory } from "react-router-dom";

export default function ActiveRequest() {

    const history = useHistory();

    const [request, setRequest] = useState([]);

    useEffect(() => {
        fetchRequestsOfTheRider();
    }, [])

    const fetchRequestsOfTheRider = async () => {
        const uid = localStorage.getItem("uid");
        console.log(uid)
        const res = await getActiveRequestForRider(uid);
        console.log(res);
        setRequest(res);
    }

    const handleGoTonext = (e) => {
        console.log("handing next");
        history.push(`/rider-map/:${e.docId}`);
    }

    return (
        <div className="main-admin-list-container">
            <h5>Active Requests</h5>
            <div className="second-list-admin-container breaker-request-new-card">

                {!!request.length && request.map((e, i) => {
                     const cus_addresss = e.data.cus_address.features;
                     const pickup = e.data.pickup_address.lat;
                     const isDone = e.data.status == "delievered" ? true : false;
                     const price = e.data.price
                    return (
                        <div className="rider-home-request-conrianer" key={i}>
                              <i className="material-icons alig-selft-right hover" onClick={()=>handleGoTonext(e)}>arrow_forward</i>
                            <div className="rider-hone-request-to-row">
                                <div className="rider-home-request-title-box">
                                    <p>Name</p>
                                    <p>Price</p>
                                    <p>Pickup</p>
                                    <p>Drop</p>
                                </div>
                                <div>
                                    <p>{e.data.item_name}</p>
                                    <p>€ {Math.round((price + Number.EPSILON) * 100) / 100}</p>
                                    <p>{pickup ?  pickup : e.data.pickup_address}</p>
                                    <p>{cus_addresss ? cus_addresss[0].place_name : cus_addresss}</p>
                                </div>
                            </div>
                            <div className="request-rider-Accept-btn">
                    <a className="waves-effect waves-light btn  blue darken-1">{isDone ? "Completed" : "Active"}</a>
                            </div>
                        </div>
                    )
                })}

            </div>
            {!request.length && <div className="center">
                <CircleLoader />
            </div>}
        </div>
    )
}
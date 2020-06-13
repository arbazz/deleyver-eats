import React from 'react';
import { updateStatusOfRequestByRider,checkCurrentStatusOfRequest, checkuser } from '../../firebase/index';

export default function Requests({ requests }) {

    const handleAccept =async (e) => {
        // console.log(e.docId);
        const user = await checkuser();
        // console.log(user)
        const res = await checkCurrentStatusOfRequest(e.docId);
        // console.log(res);
        if(res.pending === true){
            const seter = await updateStatusOfRequestByRider(e.docId, user.uid);
            console.log(seter);
            if(seter === "true"){
                alert("request accepted");
                window.location.reload(false);
            }
        }else{
            alert("failed");
            window.location.reload(false);
        }
    }

    return (
        <div className="main-admin-list-container">
            <h5>New Requests</h5>
            <div className="second-list-admin-container breaker-request-new-card">
                {!!requests.length && requests.map((e, i) => {
                    console.log(e)
                    const cus_addresss = e.data.cus_address.features;
                    const pickup = e.data.pickup_address.lat;
                    return (
                        <div className="rider-home-request-conrianer" key={i}>
                            <div className="rider-hone-request-to-row">
                                <div className="rider-home-request-title-box">
                                    <p>Name</p>
                                    <p>Price</p>
                                    <p>Pickup</p>
                                    <p>Drop</p>
                                </div>
                                <div>
                                    <p>{e.data.item_name}</p>
                                    <p>{e.data.item_price}</p>
                                    <p>{pickup ?  pickup : e.data.pickup_address}</p>
                                    <p>{cus_addresss ? cus_addresss[0].place_name : cus_addresss}</p>
                                </div>
                            </div>
                            <div className="request-rider-Accept-btn">
                                <a className="waves-effect waves-light btn  green darken-1" onClick={()=> handleAccept(e)}>Accept</a>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
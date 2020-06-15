import React, { useEffect, useState } from 'react';
import './style.css'
import Map from './ActualMap';
import { getInfoForRiderMap, updateStatusOfReqeust } from '../../firebase/index';
import { CircularLoader, CircleLoader } from '../../components/index';
import { checkuser, getUserInfo, updateResturantWallet, updateRiderAmount } from '../../firebase/index';

export default function RiderMap(props) {
    const [data, setData] = useState("");
    const [pickup, setPickup] = useState("");
    const [picked, setPick] = useState(false);
    const [delieverd, setDelievered] = useState(false);
    const [stop, setStop] = useState(false);
    useEffect(() => {
        const id = props.match.params.id;
        let myId = id.replace(':', '');
        console.log(myId)
        fetchDAta(myId);
            setStop(true)
    }, [])

    const fetchDAta = async (docId) => {
        const data = await getInfoForRiderMap(docId);
        console.log(data.price)
        if (data.status === "picked") {
            setPick(true)
        } else if (data.status === "delievered") {
            setDelievered(true);
        }
        setData(data);
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.pickup_address.long},${data.pickup_address.lat}.json?access_token=pk.eyJ1IjoiYXJiYXp6IiwiYSI6ImNrYjNzOW1uYzBiemkycW85ZXlhbHRoMDMifQ.Ywgfd_H0m12OG4iCi8U8sQ`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setPickup(data)
            });
    }

    const handleStatusChange = async (status) => {
        setStop(false)
        const userId = await checkuser();
        const user = await getUserInfo(userId.uid);
        console.log(user);
        const res = await updateRiderAmount(user.docId, data.price);
        if (res === "true") {
            const id = props.match.params.id;
            let docId = id.replace(':', '');
            console.log(status);
            updateStatusOfReqeust(status, docId);
            setStop(true)
        }
    }


    if (data && pickup) {
        return (
            <div className="container-main-ride-rmap">
                <div className="side-bar-rider-page-rider">
                    <p className="logo-main-text-rider">Delyver Eats</p>
                    <div className="route-map-detils-rider-map">
                        <p className="route-details-text-rider-map">Route details</p>
                        <div className="input-text-rider-details-map-page">
                            <i className="material-icons prefix icon-rider-page-map">home</i>
                            <input className="actual-input-detials-map-page" readOnly defaultValue={data.cus_address.features[0].place_name} />
                        </div>
                        <div className="input-text-rider-details-map-page">
                            <i className="material-icons prefix icon-rider-page-map">location_on</i>
                            <input className="actual-input-detials-map-page" readOnly defaultValue={pickup.features[0].place_name} />
                        </div>
                    </div>
                    <div className="route-map-detils-rider-map">
                        <p className="route-details-text-rider-map">Details</p>
                        <div className="extra-details-rider-map">
                            <div className="extr-a-rider-map-justo">
                                <p>Customer Name</p>
                                <p className="extra-extra-bold">{data.cus_name} </p>
                            </div>
                            <div className="extr-a-rider-map-justo">
                                <p>Item Name</p>
                                <p className="extra-extra-bold">{data.item_name}</p>
                            </div>
                            <div className="extr-a-rider-map-justo">
                                <p>Item Price</p>
                                <p className="extra-extra-bold">{data.item_price} </p>
                            </div>
                        </div>
                        {!delieverd && !picked && <button className="btn waves-effect waves-light confirm-rider-map-page-btn  green " type="submit" onClick={() => { setPick(true); handleStatusChange("picked") }}>Pick up</button>}
                        {picked && !delieverd && <button className="btn waves-effect waves-light confirm-rider-map-page-btn  green " type="submit"
                            onClick={() => { setDelievered(true); handleStatusChange("delievered") }}>
                            Deliever
                             </button>}
                        {delieverd && !stop && <div className="progress">
                            <div className="indeterminate"></div>
                        </div>}
                        {picked && delieverd && <button className="btn waves-effect waves-light confirm-rider-map-page-btn  green " type="submit" onClick={() => alert("Item delievered")}>Success</button>}
                        {picked && <p style={{ color: 'grey' }} onClick={() => setPick(false)}>Pickup!</p>}
                    </div>
                </div>
                <div>
                    <Map pickup={data.pickup_address} customerAddress={data.cus_address} picked={picked} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="center">
                <CircleLoader />
            </div>
        )
    }
}
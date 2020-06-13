import React, { useEffect, useState } from 'react';
import './style.css'
import Map from './ActualMap';
import { getInfoForRiderMap } from '../../firebase/index';
import { CircularLoader, CircleLoader } from '../../components/index';

export default function RiderMap(props) {
    const [data, setData] = useState("");
    const [pickup, setPickup] = useState("");
    useEffect(() => {
        const id = props.match.params.id;
        let myId = id.replace(':', '');
        console.log(myId)
        fetchDAta(myId);
    }, [])

    const fetchDAta = async (docId) => {
        const data = await getInfoForRiderMap(docId);
        console.log(data)
        setData(data);
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.pickup_address.long},${data.pickup_address.lat}.json?access_token=pk.eyJ1IjoiYXJiYXp6IiwiYSI6ImNrYjNzOW1uYzBiemkycW85ZXlhbHRoMDMifQ.Ywgfd_H0m12OG4iCi8U8sQ`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setPickup(data)
            });
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
                        <button className="btn waves-effect waves-light confirm-rider-map-page-btn  green " type="submit">Confirm`</button>
                    </div>
                </div>
                <div>
                    <Map pickup={data.pickup_address} customerAddress={data.cus_address}/>
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
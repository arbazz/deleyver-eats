import React, { useEffect, useState } from 'react';
import { CircleLoader } from '../../components/index';
import { checkuser, getUserInfo, updateResturantWallet, updateRequest } from '../../firebase/index';
import { ToastProvider, useToasts } from 'react-toast-notifications'


const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJiYXp6IiwiYSI6ImNrYjNzOW1uYzBiemkycW85ZXlhbHRoMDMifQ.Ywgfd_H0m12OG4iCi8U8sQ'; // Set your mapbox token here

export default function ConfirmStart({ data, setStart }) {
    const { addToast } = useToasts()

    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState("");
    const [price, setPrice] = useState("");
    useEffect(() => {
        fetchDataForDirection();
    }, [])


    const fetchDataForDirection = () => {
        fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${data.data.pickup_address.long},${data.data.pickup_address.lat};${data.data.cus_address.query[0]},${data.data.cus_address.query[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.routes[0].distance)
                if (data.routes && data.code !== "NoRoute") {

                    console.log(data)
                    const line = data.routes[0].geometry.coordinates;
                    setLoading(false)
                    const dist = data.routes[0].distance / 1000;
                    setDistance(dist)
                    setPrice((dist * 1.50) + 0.50);

                }
            });
    }

    const handelCOnfirm = async () => {
        setLoading(true)
        const userId = await checkuser();
        const user = await getUserInfo(userId.uid);
        console.log(user)
        if (user.data.amount > price) {
            console.log("enough", user.data.amount - price)
            const newAmount = user.data.amount - price;
            const res = await updateResturantWallet(user.docId, newAmount);
            console.log(res);
            if (res === "true") {
                const suck = await updateRequest(data.docId, price);
                if (suck === "true") {
                    addToast('Saved Successfully', { appearance: 'success' })
                    window.location.reload(false);
                }
            }
        }
    }

    return (
        <>
            <i className="material-icons" onClick={() => { setStart(false) }}>arrow_back</i>
            {!loading && <div className="main-start-order-dic">
                <div className="sec-start-prder">
                    <p>By Starting the order rider can recieve the request and deliever.</p>
                    <p>Total Distance: {distance}</p>
                    {/* <p >Total riding time: 33</p> */}
                    <p>Item name: {data.data.item_name}</p>
                    <h3 className="blue-text">Total Ammount: $ {Math.round((price + Number.EPSILON) * 100) / 100}</h3>
                    <button className="waves-effect waves-light btn blue" onClick={handelCOnfirm}>Confrim</button>
                </div>
            </div>}
            {loading && <div className="center">
                <CircleLoader />
            </div>}
        </>
    )
}
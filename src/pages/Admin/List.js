import React, { useState, useEffect } from 'react';
import {ListTable, RiderList} from '../../components/index';
import {getAllOrders} from '../../firebase/index';

export default function List({resturants, riders}) {
    const [order, setOrders] = useState([]);
    const [ridersData, setRidersData] = useState([]);
    useEffect(() => {
        fetchData();
    },[riders])
    const fetchData = async() => {
        const res = await getAllOrders();
        let data = [];

        // creating custom iterators for making sure array will always be same with same length;

        let iterator = 0;
        if(res.length < 3) {
            iterator = res.length
        }else{
            iterator = 3;
        }
        for (let i = 0; i< iterator; i++){
            data.push(res[i]);
        }
        // console.log(data)
        setOrders(data);
        

        let newRiders = riders;
        if(riders.length >= 3){
            newRiders.length = 3;
        }
        setRidersData(newRiders);
        // console.log(newRiders)
    
    }
    return (
        <div className="main-admin-list-container">
            <h5>Dashboard</h5>
            <div className="second-list-admin-container">
                <div className="card-list-main-admin">
                    <p>{resturants.length} resturants</p>
                </div>
                <div className="card-list-main-admin">
                    <p>{riders.length} rider</p>
                </div>
                <div className="card-list-main-admin">
                    <p>{order.length} orders</p>
                </div>
            </div>
            <div className="third-admin-list-contianer">
                <p className="new-users-admin-list">New Orders</p>
                <ListTable data={order}/>
            </div>
            <div className="third-admin-list-contianer">
                <p className="new-users-admin-list">New Riders</p>
                <RiderList data={ridersData}/>
            </div>
                {/* <div className="third-admin-list-contianer">
                    <p className="new-users-admin-list">New Resturants</p>
                    <ListTable data={order}/>
                </div> */}
        </div>
    )
}
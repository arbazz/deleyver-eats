import React from 'react';
import {ListTable} from '../../components/index';

export default function List() {

    return (
        <div className="main-admin-list-container">
            <h5>Dashboard</h5>
            <div className="second-list-admin-container">
                <div className="card-list-main-admin">
                    <p>Number of resturants</p>
                </div>
                <div className="card-list-main-admin">
                    <p>Number of rider</p>
                </div>
                <div className="card-list-main-admin">
                    <p>Number of orders</p>
                </div>
            </div>
            <div className="third-admin-list-contianer">
                <p className="new-users-admin-list">New Orders</p>
                <ListTable/>
            </div>
            <div className="third-admin-list-contianer">
                <p className="new-users-admin-list">New Riders</p>
                <ListTable/>
            </div>
            <div className="third-admin-list-contianer">
                <p className="new-users-admin-list">New Resturants</p>
                <ListTable/>
            </div>
        </div>
    )
}
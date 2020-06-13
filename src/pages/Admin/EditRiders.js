import React, { useState, useEffect } from 'react';
import EditRider from './EditRiders';
import { updateStatusOfRider } from '../../firebase/index';

export default function EditRiders({ setEditor, data }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLAstName] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState("");
    const [numVerified, setNumVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(true);

    useEffect(() => {
        setFirstName(data.data.first_name)
        setLAstName(data.data.last_name)
        setNumber(data.data.number)
        setCity(data.data.city)
        setEmail(data.data.email)
        if (data.data.token) {
            setNumVerified(true);
        }
        if (data.data.pending === false) {
            setStatus(false);
        }   
    }, [])

    const handleSaveEdit = async () => {
        const res = await EditRider(data.docId);
        console.log(res);
        window.location.reload(false)
    }

    const handleStatusChage = async() => {
        const chagedStatus = !status;
        const res =  await updateStatusOfRider(data.docId, chagedStatus);
        // console.log(res)
        window.location.reload(false)
    }
    return (
        <div className="main-admin-edit-contianer">
            <div className="edit-rest-admin">
                <i className="material-icons hover" onClick={() => { setEditor(false) }}>arrow_back</i>
                <p>Edit Resturant data</p>
    <button onClick={handleStatusChage}>{!status ? "Disable" : "Approve"}</button>
            </div>

            <div className="row">
                <div className="col s12">
                    <p>Status: {!status ? "approved" : "waiting for approval"}</p>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input value={firstName} type="text" onChange={(e) => { setFirstName(e.target.value) }} disabled/>
                    <label className="active" htmlFor="first_name">First name</label>
                </div>
                <div className="input-field col s6">
                    <input value={lastName} type="text" onChange={(e) => { setLAstName(e.target.value) }} disabled />
                    <label className="active" htmlFor="last_name">Last name</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input value={number} type="text" onChange={(e) => { setNumber(e.target.value) }} disabled />
                    <label className="active" htmlFor="number">Phone Number {numVerified && " (Verified)"}</label>
                </div>
                <div className="input-field col s6">
                    <input value={city} type="text" onChange={(e) => { setCity(e.target.value) }} disabled/>
                    <label className="active" htmlFor="city">City</label>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <input value={email} disabled type="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <label className="active" htmlFor="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <p>Document For Review</p>
                    {data.data.docImage ? <img src={data.data.docImage} width="auto" height="auto" />: <p className="blue-text">No Document Available</p>}
                </div>
            </div>
            {/* <a className="waves-effect waves-light btn" onClick={handleSaveEdit}>Save</a> */}
        </div>
    )
}
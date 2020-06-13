import React, { useState, useEffect } from 'react';
import { updateResturants } from '../../firebase/index';

export default function ResturantEdit({setEditer, data}) {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    useEffect(() =>{
        setName(data.data.name)
        setCity(data.data.city)
    }, []) 

    const handleSaveEdit = async () => {
        const res = await updateResturants(data.docId, name, city);
        console.log(res);
        window.location.reload(false)
    }

    return(
        <div className="main-admin-edit-contianer">
            <div className="edit-rest-admin">
                <i className="material-icons hover" onClick={() => {setEditer(false)}}>arrow_back</i>
                <p>Edit Resturant data</p>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input  value={name}  type="text" onChange={(e) => {setName(e.target.value)}}/>
                    <label className="active" htmlFor="name">Name</label>
                </div>
                <div className="input-field col s6">
                    <input  value={city}  type="text" onChange={(e) => {setCity(e.target.value)}}/>
                    <label className="active" htmlFor="city">City</label>
                </div>
                <a className="waves-effect waves-light btn" onClick={handleSaveEdit}>Save</a>
            </div>
        </div>
    )
}
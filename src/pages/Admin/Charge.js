import React, {useState, useEffect} from 'react';
import{ saveCharge, getCharge } from '../../firebase/index';

export default function Charge() {
    const [charge, setCharge] = useState("");
    const [currentCharge, setCurrentCharge]= useState("");

    const handelSaveClick =async () => {

        if(charge){
            const res = await saveCharge(charge);
            if(res === "true"){
                alert("success");
                window.location.reload(false)
            }
        }else{
            alert("you cannot set charge to 0")
        }

    }

    const fetchCharge = async () => {
        const res = await getCharge();
        // console.log(res);
        setCurrentCharge(res.charge);
    }
    useEffect(()=>{
        fetchCharge();
    },[])
    return (
        <div className="charge-main-admin-home">
            <div className="sec-charfe-amin">
                <p className="charge-admin-gtext">Charge</p>
                <label htmlFor="charge">Charge</label>
                <input value={charge} type="number" onChange={(e) => {setCharge(e.target.value)}} className="charge-textinput-admin"/>
                <a className="waves-effect waves-light btn" onClick={handelSaveClick}>Save</a>
            </div>
    <p>Current Charge {currentCharge}</p> 
        </div>
    )
}
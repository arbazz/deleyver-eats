import React, { useState, Fragment } from 'react';
import AddNewCus from './AddNewCus';
import { deleterMain } from '../../firebase/index';


export default function Customers({ props }) {
    // console.log(props)
    const [cus, setCus] = useState(true);
    const [editData, setEditData] = useState(false)

    const handleEdit  = (e) =>{
        setCus(false);
        setEditData(e);
    }

    const handleDelete = async (e) => {
        if(e.docId){
            const res = await deleterMain('customers', e.docId);
            if(res){
                window.location.reload(false)
            }
        }
    }
    return (
        <div className="order-rest-main-home">
            {cus ? <>
                <div className="order-host-cont-main-rest-home">
                    <p>Customers</p>
                    <p>All Customers</p>
                </div>
                <div>
                    <a onClick={() => [setCus(false), setEditData(false)]}
                        className="waves-effect waves-light btn teal lighten-1"><i className="material-icons left">add</i>Add new</a>
                </div>
                <table className="striped highlight">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.length && props.map((e, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <tr className="tr-table-rest-hpme z-depth-1">
                                        <td>{e.data.cus_name}</td>
                                        <td>{e.data.city}</td>
                                        <td className="price-rest-home">
                                            <i className="material-icons green-text hover" onClick={()=>handleEdit(e)}>edit</i>
                                        </td>
                                        <td>  
                                            <i className="material-icons red-text hover" onClick={()=>handleDelete(e)}>delete</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </> :
                <AddNewCus setcus={setCus} editData={editData}/>
            }
        </div>
    )
}
import React, { useState } from 'react';
import { updateRiderByAdmin } from '../../firebase/index';
import EditRider from './EditRiders';

export default function Riders({ riders }) {

  const [edit, setEditor] = useState(false);
  const [data, setData] = useState([]);

  const hnadleEditPress = async (e) => {
    setData(e);
    setEditor(true);
}
  return (
    <div className="main-admin-list-container">
      <h5>Riders</h5>
     {!edit && <table className="highlight" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Edit</th>
            <th>Email</th>
            <th>Number</th>
          </tr>
        </thead>

        <tbody>
          {!!riders.length && riders.map((e, i) => {
            return (
              <tr key={i}>
                <td  onClick={()=>{hnadleEditPress(e)}}>  <i className="material-icons hover teal-text text-darken-4">edit</i></td>
                <td>{e.data.email}</td>
                <td>{e.data.number}</td>
              </tr>
            )
          })}
        </tbody>
      </table>}

     {edit && <EditRider setEditor={setEditor} data={data}/>}
    </div>
  )
}
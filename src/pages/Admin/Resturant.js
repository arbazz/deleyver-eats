import React, { useState } from 'react';
import { CircleLoader } from '../../components/index';
import ResturantsEdit from './ResturantEdit';

export default function Resturant({ resturants }) {
  const [eidt, setEditer ] = useState(false);
  const [name, setName] = useState();
  const [data, setData] = useState();
  const hnadleEditPress = (e) => {
    console.log(e)
    setData(e);
    setEditer(true);
  }
  return (
    <div className="main-admin-list-container">
      <h5>Resturant</h5>
     {!eidt &&  <table className="highlight table-main-rest" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Edit</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>City</th>
          </tr>
        </thead>

        <tbody>
          {!!resturants.length && resturants.map((e, i) => {
            return (
              <React.Fragment key={i}>
                <tr>
                  <td  onClick={()=>{hnadleEditPress(e)}}>  <i className="material-icons hover teal-text text-darken-4">edit</i></td>
                  <td >{e.data.name}</td>
                  <td >{e.data.email}</td>
                  <td >{e.data.number}</td>
                  <td >{e.data.city}</td>
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>}
        {eidt &&  <ResturantsEdit setEditer={setEditer} data={data}/>}
      {!resturants.length && <div className="center">
        <CircleLoader />
      </div>}
    </div>
  )
}
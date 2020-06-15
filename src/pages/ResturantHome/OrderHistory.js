import React, { useState } from 'react';
import "./style.css"
import moment from 'moment'
import ConfirmStart from './ConfirmStart';
import { ToastProvider, useToasts } from 'react-toast-notifications'

export default function OrderHistory({ props }) {
    const [start, setStart] = useState(false);
    const [data, setData] = useState("")
    // console.log(props)
    return (
        <ToastProvider>

            <div className="order-rest-main-home">

                {!start && <>
                    <div className="order-host-cont-main-rest-home">
                        <p>Order history</p>
                        <p>All orders</p>
                    </div>

                    <table className="striped highlight">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Item Name</th>
                                <th>Item Price</th>
                                <th>Order Status</th>
                                <th>Schedule</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.length && props.map((e, i) => {
                                const pending = e.data.pending;
                                console.log(e.data)
                                if (e.data.timeStamp) {
                                    // console.log(new Date())
                                }
                                return (
                                    <React.Fragment key={i}>
                                        <tr className="tr-table-rest-hpme z-depth-1">
                                            <td>{e.data.cus_name}</td>
                                            <td>{e.data.item_name}</td>
                                            <td className="price-rest-home">{e.data.item_price}</td>
                                            <td className="pending-rest-home">{e.data.status == "delievered" ? "fulfilled" : "pending"}</td>
                                            <td>{e.data.timeMoment}</td>
                                            <td><button disabled={e.data.paid ? true : false} onClick={() => { setStart(true); setData(e) }}> {e.data.paid ? "Paid" : "Start"} </button></td>
                                        </tr>
                                        {/* <div style={{height: 10}}></div> */}
                                        <tr>
                                            <td>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </>}
                {start && <ConfirmStart data={data} setStart={setStart} />}
            </div>
        </ToastProvider>

    )
}
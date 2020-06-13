import React from 'react';
import "./style.css"
import moment from 'moment'

export default function OrderHistory({ props }) {
    // console.log(props)
    return (

        <div className="order-rest-main-home">
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
                    </tr>
                </thead>

                <tbody>
                    {props.length && props.map((e, i) => {
                        const pending = e.data.pending;
                        if(e.data.timeStamp) {
                            // console.log(new Date())
                        }
                        return (
                            <>
                                <tr className="tr-table-rest-hpme z-depth-1" key={i}>
                                    <td>{e.data.cus_name}</td>
                                    <td>{e.data.item_name}</td>
                                    <td className="price-rest-home">{e.data.item_price}</td>
                                    <td className="pending-rest-home">{e ? "pending": "fulfilled"}</td>
                        <td>{e.data.timeMoment}</td>
                                </tr>
                                {/* <div style={{height: 10}}></div> */}
                                <tr>
                                    <td>
                                    </td>
                                </tr>
                            </>
                        )
                    })
                    }
                </tbody>
            </table>

        </div>
    )
}
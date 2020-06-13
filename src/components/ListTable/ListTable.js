import React, { useEffect } from 'react';

export default function ListTable({ data }) {
    // console.log(data)

    return (
        <div className="item-new-admin-list-coontainre">
            <table className="centered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                    </tr>
                </thead>

                <tbody>
                    {!!data && !!data.length && data.map((e, i) => {
                        let status;
                        if(e.data){
                             status = e.data.pending;
                        }
                        return (
                            <React.Fragment key={i}>
                                <tr>
                                    <td>{e.data.cus_name}</td>
                                    <td>{e.data.item_name}</td>
                                    <td>{status ? "Pending" : "Delieverd"}</td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
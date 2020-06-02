import React from 'react';
import { saveRequest } from '../../firebase/index';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



export default class CreateRequest extends React.Component {
    constructor() {
        super();
        this.state = {
            item_name: '',
            item_price: '',
            pickup_address: '',
            cus_name: '',
            phone_number: '',
            city: '',
            cus_address: '',
            cus_note: '',
            err: '',
            options: []
        }
    }

    handleChangeText = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    componentDidMount(){
        let arr = [];
        const cus = this.props.cus;
        for(let i = 0; i<cus.length; i++){
            arr.push({value: i, label: cus[i].data.cus_name});
        }
        this.setState({options: arr});
    }
    _onSelect = (e) => {
        console.log(e)
        const selected = this.props.cus[e.value].data;
        this.setState({
            cus_name: selected.cus_name,
            cus_address: selected.cus_address,
            cus_note: selected.cus_note,
            phone_number: selected.phone_number,
            city: selected.city
        })
    }
    handleCreate = async () => {
        const { item_name, item_price, pickup_address, cus_name, phone_number, city, cus_address, cus_note } = this.state;
        console.log(item_name, item_price, pickup_address, cus_name, phone_number, city, cus_address, cus_note)
        if (item_name && pickup_address && cus_name && phone_number && cus_address) {
            const res = await saveRequest(item_name, item_price, pickup_address, cus_name, phone_number, city, cus_address, cus_note);
            console.log(res);
            if (res === "true") {
                this.setState({
                    item_name: '',
                    item_price: '',
                    pickup_address: '',
                    cus_name: '',
                    phone_number: '',
                    city: '',
                    cus_address: '',
                    cus_note: '',
                })
                alert("success!");
                window.location.reload(false);
            }
        } else {
            this.setState({ err: "all fields mark with (*) must be fill." })
        }
    }

    render() {
        const { err } = this.state;
        const {options, item_name, item_price, pickup_address, cus_name, phone_number, city, cus_address, cus_note } = this.state;
        return (
            <div className="order-rest-main-home">
                <h5 className="grey-text">Delivery request</h5>
                <p className="grey-text">Item Information</p>
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home">
                        <input  id="item_name" value={item_name}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        <label htmlFor="item_name">Item Name*</label>
                    </div>
                    <div className="input-field input-create-rest-home">
                        <input  id="item_price" value={item_price}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        <label htmlFor="item_price">Item Price</label>
                    </div>
                </div>
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home-full">
                        <input  id="pickup_address" value={pickup_address}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        <label htmlFor="address">Pickup address*</label>
                    </div>
                </div>
                <p className="grey-text">Customer Information</p>
                <p>Saved Customers</p>

                <Dropdown options={options} onChange={this._onSelect} value={options[0]} placeholder="Select Customer" />
                
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home-full">
                        <input placeholder="name of the customer" id="cus_name" value={cus_name}
                            onChange={(e) => { this.handleChangeText(e); }} 
                            type="text" className="validate" />
                        {/* <label htmlFor="fill_name">Full Name*</label> */}
                    </div>
                </div>
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home">
                        <input  id="phone_number" value={phone_number} placeholder="phone number"
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        {/* <label htmlFor="phone_number">Phone Number*</label> */}
                    </div>
                    <div className="input-field input-create-rest-home">
                        <input placeholder="city"  id="city" value={city}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        {/* <label htmlFor="city">City</label> */}
                    </div>
                </div>
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home-full">
                        <input placeholder="address of the customer" id="cus_address" value={cus_address}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        {/* <label htmlFor="address">Address*</label> */}
                    </div>
                </div>
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home-full">
                        <input placeholder="note to the customer" id="cus_note" value={cus_note}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        {/* <label htmlFor="address">Note</label> */}
                    </div>
                </div>
                {err && <p className="red-text">{err}</p>}
                <div className="btn-create-request-done ">
                    <a className="waves-effect waves-light btn blue darken-2" onClick={this.handleCreate}>Create</a>
                </div>
            </div>
        )
    };
};

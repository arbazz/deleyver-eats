import React from 'react';
import { saveCus, updateCustomer } from '../../firebase/index';

export default class AddNewCus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cus_name: '',
            phone_number: '',
            city: '',
            cus_address: '',
            cus_note: '',
            err: '',
            loading: false
        };
    };

    componentDidMount(){
        // handling data coming from the previous component if this will be true rather then normal set function
        // update fuction would intiate on press of the button with depending on the var.
        const data = this.props.editData;
        console.log(data)
        if(data){
            this.setState({
                docId: data.docId,
                cus_name: data.data.cus_name,
                city: data.data.city,
                cus_address: data.data.cus_address,
                cus_note: data.data.cus_note,
                phone_number: data.data.phone_number,
            })
        }
    }

    handleChangeText = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleCreate = async () => {
        if(this.state.docId){
            this.updateExisting();    
        }else{
            this.creteNew();
        }
       
    }

    updateExisting = async () => {
        console.log("updating");
        const { cus_name, phone_number, city, cus_address, cus_note, docId } = this.state;
        this.setState({ loading: true });
        if (cus_name && city && phone_number && cus_address && docId) {
        const res = await updateCustomer(docId,cus_name, phone_number, city, cus_address, cus_note);
        if(res=== "true"){
            window.location.reload(false);
            alert("Updated")
        }
        }else{
            this.setState({err: "Empty fields cannot be updated."})
        }
    }

    creteNew = async () => {
        const { cus_name, phone_number, city, cus_address, cus_note } = this.state;
        if (cus_name && city && phone_number && cus_address) {
            this.setState({ loading: true });
            const res = await saveCus(cus_name, phone_number, city, cus_address, cus_note);
            if(res === "true"){
                window.location.reload(false);
                alert("New Customer Added.")
            }
        } else {
            this.setState({ err: "All fields mark with (*) must be fill.", loading: false })
        }
    }

    render() {
        const { cus_name, phone_number, city, cus_address, cus_note, err, loading, docId } = this.state;
        return (
            <div className="order-rest-main-home">
                <div>
                    <i className="material-icons arrouw-back-add-new-cus" onClick={() => { this.props.setcus(true) }}>arrow_back</i>
                </div>
                <p className="grey-text">Customer Information</p>
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home-full">
                        <input  id="cus_name" value={cus_name}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        <label htmlFor="fill_name"  className="active">Full Name*</label>
                    </div>
                </div>
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home">
                        <input  id="phone_number" value={phone_number}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        <label htmlFor="phone_number" className="active">Phone Number*</label>
                    </div>
                    <div className="input-field input-create-rest-home">
                        <input  id="city" value={city}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        <label htmlFor="city" className="active">City*</label>
                    </div>
                </div>
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home-full">
                        <input  id="cus_address" value={cus_address}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        <label htmlFor="address" className="active">Address*</label>
                    </div>
                </div>
                <div className="row-main-rest-home-inpu-create">
                    <div className="input-field input-create-rest-home-full">
                        <input  id="cus_note" value={cus_note}
                            onChange={(e) => { this.handleChangeText(e); }}
                            type="text" className="validate" />
                        <label htmlFor="address" className="active">Note</label>
                    </div>
                </div>
                {!loading && <a className="waves-effect waves-light btn indigo darken-4" 
                onClick={this.handleCreate}>{docId ? "update" : "save"}</a>}
                {err && <p className="red-text">{err}</p>}
                {loading && <div className="progress">
                    <div className="indeterminate"></div>
                </div>}

            </div>
        )
    }
}
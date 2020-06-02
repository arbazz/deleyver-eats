import React from 'react';
import { CircleLoader, SimpleNav } from '../../components/index';
import './styles.css'
import { saveImage,saveImageToDb , getUserInfo} from '../../firebase/index';

export default class Doc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            imageUrl: '',
            err: "",
            file: '',
            pending: false
        }
    }

    componentDidMount() {
        getUserInfo(localStorage.getItem("uid")).then((res)=>{
            console.log(res);
            this.setState({imageUrl: res.data.docImage});
            if(res.data.pending){ this.setState({pending: true}) }
            this.setState({ loading: false });
        })
    }

    _onChange = (e) => {

        const file = e.target.files[0]
        const reader = new FileReader();
        this.setState({file: e.target});
        reader.onloadend = () => {
            this.setState({
                imageUrl: reader.result
            })
        }
        if (file) {
            reader.readAsDataURL(file);
            this.setState({
                imageUrl: reader.result
            })
        }
        else {
            this.setState({
                imageUrl: ""
            })
        }
    }

    upload = async() => {
        const { imageUrl, file } = this.state;
        if (imageUrl) {
            this.setState({ loading: true });
            const res = await saveImage(file.files[0]);
            console.log(res);
            if(res){
                this.setState({pending: true, loading: false});
                alert("file uploaded")
                const docId = localStorage.getItem("docId");
                if(docId){
                    saveImageToDb(docId, res);
                }else{
                    alert('something went wrong!')
                }
            }
        } else {
            this.setState({ err: "Image must be selected" })
        }
    }

    render() {
        const { loading, err, pending } = this.state;
        return (
            <>
                <SimpleNav />
                {loading && <div className="loader-doc-main">
                    <CircleLoader />
                </div>}
                {!loading && <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h4>Documents</h4>
                            {pending ? <p className="indigo-text">Your documents is in verification process please wait.</p> :
                            <p className="indigo-text">Please upload your documents to verify.</p>}
                            <img className="materialboxed" width="20%" className="image-doc" src={this.state.imageUrl} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <label htmlFor="img">Select documents:</label>
                            <input type="file" id="img" name="img" accept="image/*" onChange={this._onChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <p className="waves-effect waves-light btn" onClick={this.upload}>Upload</p>
                        </div>
                    </div>
                    <p style={{color: "tomato"}}>{err}</p>
                </div>}
            </>
        )
    }
}
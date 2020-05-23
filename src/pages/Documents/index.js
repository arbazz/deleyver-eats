import React from 'react';
import { CircleLoader, SimpleNav } from '../../components/index';
import './styles.css'

export default class Doc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render() {
        const { loading } = this.state;
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
                            <p className="indigo-text">Please upload your documents to verify.</p>
                            <img className="materialboxed" width="50%" className="image-doc" src={require("../../assets/images/logo.jpeg")} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <label for="img">Select documents:</label>
                            <input type="file" id="img" name="img" accept="image/*" />
                        </div>
                        </div>
                    <div className="row">
                        <div className="col s12">
                        <p className="waves-effect waves-light btn">button</p>
                        </div>
                        </div>
                    </div>}
            </>
        )
    }
}
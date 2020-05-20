import React from 'react';
import './style.css'
import { primaryColor } from '../../config/theme'

export default function Banner() {

    return (
        <>
            <div className="container banner-contaienr">
                <div className="banner-first">
                    <p className="fast-delievery purple-text text-darken-2">Fast Delievery</p>
                    <h1 className="delievery purple-text text-darken-2">Delievery</h1>
                    <h4 className="purple-text text-darken-2 to-the-door">to the door</h4>
                    <p className=" custom-texteer">your custom content it could be tag line or moto or anything important to note...</p>

                    <button class="btn waves-effect waves-light button-order-banner" style={{backgroundColor: primaryColor}} type="submit" name="action">Order
                         <i class="material-icons right">send</i>
                    </button>

                </div>
                <div className="image-banner-container">
                    <img src={require("../../assets/images/bannerImage.png")} className="banner-image" />
                </div>

            </div>

        </>
    )
}
import React from 'react';
import './style.css'
import { useSpring, animated } from 'react-spring'


function AboutCard() {
    const props = useSpring({ opacity: 1, from: { opacity: 0 } })

    return (
        <animated.div style={props} className="puuchablity-of-segment">
            <div className="about-home-main-contianer">
                <img src={require("../../assets/images/AboutImage.png")} className="image-about-home"/>
                <div className="about-text-home">
                    <h4>About us</h4>
                    <p className="about-home-dexc">sometinhg about your company services and contact or it can be anything you want to share about you!!</p>
                </div>
            </div>
        </animated.div>
    );
}

export default AboutCard;

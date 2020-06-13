import React from 'react';
import './style.css'
import { useSpring, animated } from 'react-spring'
import { NavBar, Banner, HomeCard, AboutCard, Footer, EarnCard, Why, CopyRight } from '../../components/index'


function Home() {
    const props = useSpring({ opacity: 1, from: { opacity: 0 } })

    return (
        <animated.div style={props}>
            <NavBar/>
            <Banner/>
            <HomeCard/>
            <AboutCard/>
            <EarnCard />
            <Why />
            <Footer />
            <CopyRight/>
        </animated.div>
    );
}

export default Home;

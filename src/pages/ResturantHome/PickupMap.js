import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
// import PolylineOverlay  from "../RiderMap/ScatterOverlay";
import Geocoder from 'react-mapbox-gl-geocoder'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJiYXp6IiwiYSI6ImNrYjNzOW1uYzBiemkycW85ZXlhbHRoMDMifQ.Ywgfd_H0m12OG4iCi8U8sQ'; // Set your mapbox token here


export default function PickUpMap({setGeoLocation}) {
    // console.log("state", geo)
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 4
    });

    const [zoom, setZoom] = useState(5);
    const [seacth, setSearch] = useState("");

    useEffect(() => {
       
        if ("geolocation" in navigator) {
            // console.log("as feo")
            navigator.geolocation.getCurrentPosition(function (position) {
                // console.log("Latitude is :", position.coords.latitude);
                // console.log("Longitude is :", position.coords.longitude);
                setViewport({
                    width: 400,
                    height: 400,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    zoom: 4
                })
            });
        } else {
            console.log("Not Available");
        }
        
    }, [])

    const _updateViewport = (viewport) => {
        console.log(viewport)
        setZoom(viewport.zoom)
    }

    const onSelected = (e) => {
        console.log(e);
        setViewport({
            width: 400,
            height: 400,
            latitude: e.latitude,
            longitude: e.longitude,
            zoom: 4
        })
        setGeoLocation(e)
    }

    return (
        <div className="map-style-res-to-med">
            <Geocoder
                mapboxApiAccessToken={MAPBOX_TOKEN} onSelected={onSelected} viewport={viewport} hideOnSelect={true}
                queryParams={{ country: "fr" }}
                initialInputValue={seacth}
            />
            <p>Selected: {viewport.latitude} {viewport.longitude}</p>
            <div style={{display: "flex"}}>
                <ReactMapGL
                    {...viewport}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    width="90vw"
                    height="50vh"
                    latitude={viewport.latitude} longitude={viewport.longitude} zoom={zoom}
                >
                    <div style={{ position: 'absolute', right: 0 }}>
                        <NavigationControl onViewportChange={_updateViewport} />
                    </div>
                    {/* <PolylineOverlay points={ [pickUp, [-76.566666,  42.933334]]}/> */}
                    <Marker
                        latitude={viewport.latitude} longitude={viewport.longitude} 
                    >
                        <i className="Large material-icons map-icon-pin-rider">location_on</i>
                    </Marker>
                </ReactMapGL>
            </div>
        </div>
    )
}
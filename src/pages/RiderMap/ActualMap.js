import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import PolylineOverlay from "./ScatterOverlay";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJiYXp6IiwiYSI6ImNrYjNzOW1uYzBiemkycW85ZXlhbHRoMDMifQ.Ywgfd_H0m12OG4iCi8U8sQ'; // Set your mapbox token here


export default function Map({ pickup, customerAddress }) {
    const [zoom, setZoom] = useState(5);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: pickup.lat,
        longitude: pickup.long,
        zoom: 4
    });

    const [pickUp, setPickUp] = useState([]);

    useEffect(() => {
        console.log(customerAddress)
        setPickUp([pickup.long, pickup.lat])
    }, [])

    const _updateViewport = (viewport) => {
        console.log(viewport)
        setZoom(viewport.zoom)
    }

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            width="75vw"
            height="100vh"
            latitude={viewport.latitude} longitude={viewport.longitude} zoom={zoom}
        >
            <div style={{ position: 'absolute', left: 0, zIndex: 100 }}>
                <NavigationControl
                 onViewportChange={_updateViewport}  />
            </div>
            <div style={{ position: 'absolute', right: 0, zIndex: 100 }}>
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    onViewportChange={nextViewport => console.log(nextViewport)}
                    onGeolocate={nextViewport => setViewport(nextViewport)}
                />
            </div>
            <PolylineOverlay points={[pickUp, [customerAddress.query[0], customerAddress.query[1]]]} />
            <Marker
                latitude={pickup.lat} longitude={pickup.long}
            >
                <i className="Large material-icons map-icon-pin-rider">location_on</i>
            </Marker>
        </ReactMapGL>
    )
}
import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, StaticMap } from 'react-map-gl';
import PolylineOverlay from "./ScatterOverlay";
import { PathLayer } from "@deck.gl/layers";
import { TripsLayer } from '@deck.gl/geo-layers';

import DeckGL from "deck.gl";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJiYXp6IiwiYSI6ImNrYjNzOW1uYzBiemkycW85ZXlhbHRoMDMifQ.Ywgfd_H0m12OG4iCi8U8sQ'; // Set your mapbox token here

// data needed for overlay here
// const data = [{
//     name: "random-name",
//     color: [101, 147, 245],
//     path: [[-74.00578, 40.713067],
//     [-74.004577, 40.712425],
//     [-74.003626, 40.713650],
//     [-74.002666, 40.714243],
//     [-74.002136, 40.715177],
//     [-73.998493, 40.713452],
//     [-73.997981, 40.713673],
//     [-73.997586, 40.713448],
//     [-73.99256, 40.713863]]
// }]

export default function Map({ pickup, customerAddress, picked }) {
    const [zoom, setZoom] = useState(5);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: pickup.lat,
        longitude: pickup.long,
        zoom: 4
    });

    const [data, setData] = useState()

    const [pickUp, setPickUp] = useState([]);
    const [rider, setRiderInit] = useState('');

    useEffect(() => {
        if (!rider) {
            getCurrentLoc()
        }

        getDirectionRoute();

        setPickUp([pickup.long, pickup.lat])
    }, [rider, picked])

    const getCurrentLoc = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                // console.log(position.coords)
                setRiderInit(position.coords);

            });
        }
        else {
            alert('W3C Geolocation API is not available');
        }
        setInterval(function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {

                    // console.log(position.coords)
                    setRiderInit(position.coords);

                });
            }
            else {
                alert('W3C Geolocation API is not available');
            }
        }, 10000);


    }


    const getDirectionRoute = () => {
        // console.log("rider", customerAddress)
        if (rider && !picked) {
          
            fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${rider.longitude},${rider.latitude};${pickup.long},${pickup.lat};${customerAddress.query[0]},${customerAddress.query[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    if (data.routes && data.code !== "NoRoute") {

                        // console.log(data.routes[0])
                        const line = data.routes[0].geometry.coordinates;
                        setData([{
                            name: "random-name",
                            color: [101, 147, 245],
                            path: line
                        }])
                    }
                });
        }else if(rider && picked ){
            console.log("this world")
            fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${rider.longitude},${rider.latitude};${customerAddress.query[0]},${customerAddress.query[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if (data.routes && data.code !== "NoRoute") {

                    // console.log(data.routes[0].geometry.coordinates)
                    const line = data.routes[0].geometry.coordinates;
                    setData([{
                        name: "random-name",
                        color: [101, 147, 245],
                        path: line
                    }])
                }
            });
        }
    }

    const _updateViewport = (viewport) => {
        console.log(viewport)
        setZoom(viewport.zoom)
    }
    const layer = [
        new PathLayer({
            id: "path-layer",
            data,
            getWidth: data => 7,
            getColor: data => data.color,
            widthMinPixels: 7
        })
    ]



    return (
        // <ReactMapGL
        //     {...viewport}
        //     onViewportChange={nextViewport => setViewport(nextViewport)}
        //     mapboxApiAccessToken={MAPBOX_TOKEN}
        //     width="75vw"
        //     height="100vh"
        //     latitude={viewport.latitude} longitude={viewport.longitude} zoom={zoom}
        // >
        //     <div style={{ position: 'absolute', left: 0, zIndex: 100 }}>
        //         <NavigationControl
        //          onViewportChange={_updateViewport}  />
        //     </div>
        //     <div style={{ position: 'absolute', right: 0, zIndex: 100 }}>
        //         <GeolocateControl
        //             positionOptions={{ enableHighAccuracy: true }}
        //             trackUserLocation={true}
        //             onViewportChange={nextViewport => console.log(nextViewport)}
        //             onGeolocate={nextViewport => setViewport(nextViewport)}
        //         />
        //     </div>
        //     <PolylineOverlay points={[pickUp, [customerAddress.query[0], customerAddress.query[1]]]} />
        //     <Marker
        //         latitude={pickup.lat} longitude={pickup.long}
        //     >
        //         <i className="Large material-icons map-icon-pin-rider">location_on</i>
        //     </Marker>
        // </ReactMapGL>
        <div style={{ marginLeft: "25vw" }}>
            <DeckGL
                initialViewState={{
                    longitude: pickup.long,
                    latitude: pickup.lat,
                    zoom: 12
                }}
                height='100vh'
                width="75vw"
                controller={true} // allows the user to move the map around
                layers={layer} // layers here!
            >

                <StaticMap
                    width="75vw"
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                >
                    <Marker
                        latitude={pickup.lat} longitude={pickup.long}>
                        <i className="Large material-icons map-icon-pin-rider">shopping_basket</i>
                    </Marker>
                    <Marker
                        latitude={customerAddress.query[1]} longitude={customerAddress.query[0]}>
                        <i className="Large material-icons map-icon-pin-rider">location_on</i>
                    </Marker>
                    {rider && <Marker
                        latitude={rider.latitude} longitude={rider.longitude}>
                        <i className="Large material-icons map-icon-pin-rider">directions_bike</i>
                    </Marker>}

                </StaticMap>
            </DeckGL>
        </div>
    )
}
import React, { useState, useEffect, useRef } from "react";


const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"


function GM(props) {

    let googleMap;
    const googleMapRef = useRef();


     // Load all journals and store them with setJournals
     useEffect(() => {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        googleMapScript.async = true;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", () => {
        });

    }, [])

    const createGoogleMap = (coordinates) => {
        // googleMap = new window.google.maps.Map(googleMapRef.current, {
        //     zoom: 6,
        //     center: {
        //         lat: coordinates.lat(),
        //         lng: coordinates.lng(),
        //     },
        //     disableDefaultUI: true,
        // });

        // lat = coordinates.lat;
        // lng = coordinates.lng;
    
        // new window.google.maps.Marker({
        //     position: { lat, lng },
        //     map: googleMap,
        //     animation: window.google.maps.Animation.DROP,
        // });
    };



    // createGoogleMap(props.center);





    return (
        <div>
            {/* id="google-map"
            ref={googleMapRef}
            style={{ width: "100%", height: "300px" }} */}
        </div>
    )
    
}

export default GM

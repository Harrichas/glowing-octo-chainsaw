import React, { useState, useEffect, useRef } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";

// import dayjs from 'dayjs';

// import Maps from "../components/Maps";
// import GoogleMapReact from 'google-map-react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"


function GMap() {

    let googleMap;
    let i;

    const googleMapRef = useRef();
    let journals = [
        {
            "place": "The University of Texas at Austin",
            // "latlang": (30.285159344585896, -97.73407849215118),
            "lat": 30.285159344585896,
            "lang": -97.73407849215118,
        },
        {
            "place": "Franklin Barbecue",
            "latlang": (30.27029481906284, -97.7313370539002),
            "lat": 30.27029481906284,
            "lang": -97.7313370539002,
        },
    ];



    // Setting our component's initial state
    // const [journals, setJournals] = useState([])


    // Load all journals and store them with setJournals
    useEffect(() => {

        // LOAD GOOGLE MAPS
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        googleMapScript.async = true;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", () => {
        });

        // initMap(journals)
        // console.log(journals);



    }, [])



    function initMap() {


        const googleMap = new window.google.maps.Map(googleMapRef.current, {

            // This will take effect when there are multiple places
            zoom: 0,
            // center: { lat: -25.344, lng: 131.036 },
            // center: new google.maps.LatLng(37.0902, -95.7129)
            // center: new window.google.maps.LatLng(37.0902, -95.7129)
            mapTypeId: 'hybrid'
        });

        // Drop pins on all locations
        const latlngbounds = new window.google.maps.LatLngBounds();

        if (journals.length === 1) {
            // const markerLocation = new window.google.maps.LatLng(37.0902, -95.7129)
            const markerLocation = new window.google.maps.LatLng(
                journals[0].lat,
                journals[0].lang
            );

            const googleMap = new window.google.maps.Map(googleMapRef.current, {
                zoom: 18,
                mapTypeId: 'satellite',

                // center: new window.google.maps.LatLng(37.0902, -95.7129)
                center: new window.google.maps.LatLng(journals[0].lat, journals[0].lang)

            });

            const marker = new window.google.maps.Marker({
                map: googleMap,
                // position: new window.google.maps.LatLng(37.0902, -95.7129),
                position: new window.google.maps.LatLng(journals[0].lat, journals[0].lang),
            });

        } else {

            for (i = 0; i < journals.length; i++) {
                // const markerLocation = new window.google.maps.LatLng(37.0902, -95.7129)
                const markerLocation = new window.google.maps.LatLng(
                    // working
                    journals[i].lat,
                    journals[i].lang
                    // try journals
                    // journals[i].center.lat,
                    // journals[i].center.lng
                );

                console.log(`journals[i].lat=${journals[i].lat}`);
                console.log(`journals[i].lang=${journals[i].lang}`);

                // eslint-disable-next-line no-unused-vars
                const marker = new window.google.maps.Marker({
                    // position: { lat: -25.344, lng: 131.036 },
                    position: markerLocation,
                    map: googleMap
                });

                console.log(`markerLocation=${markerLocation}`);

                latlngbounds.extend(markerLocation);
            }
            // map.fitBounds(latlngbounds);
            googleMap.fitBounds(latlngbounds);

        }
    }

    return (
        <Container fluid>
            <div
                id="google-map"
                ref={googleMapRef}
                style={{ width: "100%", height: "300px" }}
            />
        </Container>
    )
}

export default GMap



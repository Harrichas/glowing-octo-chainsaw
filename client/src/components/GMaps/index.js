import React, { useRef } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"


function GMaps({ userListArr }) {

    const googleMapRef = useRef();
    // let googleMap;
    let i;
    // console.log(userListArr);

    // LOAD GOOGLE MAPS
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
        initMap({ userListArr })
    });

    // function to initial map using google maps api
    function initMap() {
        const googleMap = new window.google.maps.Map(googleMapRef.current, {

            // This will take effect when there are multiple places
            zoom: 0,
            mapTypeId: 'hybrid',
            // center: new window.google.maps.LatLng(37.0902, -95.7129)
        });

        // Drop pins on all locations
        const latlngbounds = new window.google.maps.LatLngBounds();

        // SINGLE LOCATION
        console.log(`userListArr.length=${userListArr.length}`);



        // LANDING MAP AT US
        if (userListArr.length === 1) {
            console.log(userListArr);
            // const markerLocation = new window.google.maps.LatLng(37.0902, -95.7129)
            // eslint-disable-next-line no-unused-vars
            const markerLocation = new window.google.maps.LatLng(
                userListArr[0].lat,
                userListArr[0].lng
            );

            console.log(userListArr[0].lat);
            console.log(userListArr[0].lng);

            const googleMap = new window.google.maps.Map(googleMapRef.current, {
                zoom: 4,
                mapTypeId: 'hybrid',
                // center: new window.google.maps.LatLng(37.0902, -95.7129)
                center: new window.google.maps.LatLng(userListArr[0].lat, userListArr[0].lng)
            });

            // eslint-disable-next-line no-unused-vars
            const marker = new window.google.maps.Marker({
                map: googleMap,
                // position: new window.google.maps.LatLng(37.0902, -95.7129),
                position: new window.google.maps.LatLng(userListArr[0].lat, userListArr[0].lng),
            });



            // MULTIPLE LOCATIONS
        } else {

            for (i = 0; i < userListArr.length; i++) {
                // const markerLocation = new window.google.maps.LatLng(37.0902, -95.7129)
                const markerLocation = new window.google.maps.LatLng(
                    userListArr[i].lat,
                    userListArr[i].lng
                );
                const title = userListArr[i].place;

                // console.log(userListArr[i].lat);
                // console.log(userListArr[i].lng);

                // eslint-disable-next-line no-unused-vars
                const marker = new window.google.maps.Marker({
                    // position: { lat: -25.344, lng: 131.036 },
                    position: markerLocation,
                    map: googleMap,
                    title: title,

                });

                // console.log(`markerLocation=${markerLocation}`);
                latlngbounds.extend(markerLocation);
            }
            // map.fitBounds(latlngbounds);
            googleMap.fitBounds(latlngbounds);
        }
    }

    return (
        <div
            id="google-map"
            ref={googleMapRef}
            style={{ width: "100%", height: "300px" }}
        />
    )
}

export default GMaps



import React, { useRef } from "react";

// const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"
const GOOGLE_MAPS_API_KEY = "AIzaSyD3KGpziXLUe7Z_oxsS-v-yhtiB-qlqT_I"
// const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


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
            zoom: 15,
            mapTypeId: 'hybrid',
            // center: new window.google.maps.LatLng(37.0902, -95.7129)
        });

        // Drop pins on all locations
        const latlngbounds = new window.google.maps.LatLngBounds();

        // SINGLE LOCATION
        // console.log(`userListArr.length=${userListArr.length}`);



        // LANDING MAP AT US
        if (userListArr.length === 0) {
            // eslint-disable-next-line no-unused-vars
            const markerLocation = new window.google.maps.LatLng(30.26680179555205, -97.744373710006)

            const googleMap = new window.google.maps.Map(googleMapRef.current, {
                zoom: 12,
                mapTypeId: 'hybrid',
                center: new window.google.maps.LatLng(30.26680179555205, -97.744373710006)
            });

            // eslint-disable-next-line no-unused-vars
            const marker = new window.google.maps.Marker({
                map: googleMap,
                position: new window.google.maps.LatLng(30.26680179555205, -97.744373710006),
                title: "Austin, TX",

            });

            // MULTIPLE LOCATIONS
        } else if (userListArr.length === 1) {
            // console.log(userListArr);            
            // const markerLocation = new window.google.maps.LatLng(37.0902, -95.7129)
            // eslint-disable-next-line no-unused-vars
            const markerLocation = new window.google.maps.LatLng(
                userListArr[0].lat,
                userListArr[0].lng
            );
            const title = userListArr[0].place;

            const googleMap = new window.google.maps.Map(googleMapRef.current, {
                zoom: 17,
                mapTypeId: 'hybrid',
                // center: new window.google.maps.LatLng(37.0902, -95.7129)
                center: new window.google.maps.LatLng(userListArr[0].lat, userListArr[0].lng)
            });

            // eslint-disable-next-line no-unused-vars
            const marker = new window.google.maps.Marker({
                map: googleMap,
                // position: new window.google.maps.LatLng(37.0902, -95.7129),
                position: new window.google.maps.LatLng(userListArr[0].lat, userListArr[0].lng),
                title: title,

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
            style={{ width: "100%", height: "600px" }}
        />
    )
}

export default GMaps



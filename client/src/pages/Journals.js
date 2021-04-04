import React, { useState, useEffect, useRef } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

import dayjs from 'dayjs';

// import Maps from "../components/Maps";
// import GoogleMapReact from 'google-map-react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"


function Journals() {

    let googleMap;
    const googleMapRef = useRef();
    // Initialize and add the map
    let map;
    let service;
    let infowindow;


    // let userListArr = [];
    let userListArr = [
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

    let newAddArr = [];
    let geoLocationObj = {};
    let memberEmail;
    let i;


    // Setting our component's initial state
    const [journals, setJournals] = useState([])
    // const [journals, setJournals] = useState([{_id: "" , center: {lat: "", lng: ""}}])
    const [formObject, setFormObject] = useState({})
    const [latestPlace, setLatestPlace] = useState({})

    // Load all journals and store them with setJournals
    useEffect(() => {
        loadJournals()

        // LOAD GOOGLE MAPS
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        googleMapScript.async = true;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", () => {
            initMap(userListArr)
        });

    }, [])

///////////////////////////////////////////////////////////


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

        if (userListArr.length === 1) {
            // const markerLocation = new window.google.maps.LatLng(37.0902, -95.7129)
            const markerLocation = new window.google.maps.LatLng(
                userListArr[0].lat,
                userListArr[0].lang
            );

            const googleMap = new window.google.maps.Map(googleMapRef.current, {
                zoom: 18,
                mapTypeId: 'satellite',

                // center: new window.google.maps.LatLng(37.0902, -95.7129)
                center: new window.google.maps.LatLng(userListArr[0].lat, userListArr[0].lang)

            });

            const marker = new window.google.maps.Marker({
                map: googleMap,
                // position: new window.google.maps.LatLng(37.0902, -95.7129),
                position: new window.google.maps.LatLng(userListArr[0].lat, userListArr[0].lang),
            });

        } else {

            for (i = 0; i < userListArr.length; i++) {
                // const markerLocation = new window.google.maps.LatLng(37.0902, -95.7129)
                const markerLocation = new window.google.maps.LatLng(
                    userListArr[i].lat,
                    userListArr[i].lang
                );

                console.log(userListArr[i].lat);
                console.log(userListArr[i].lang);

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

///////////////////////////////////////////////////////////

    const createGoogleMap = (coordinates) => {
        googleMap = new window.google.maps.Map(googleMapRef.current, {
            zoom: 6,
            center: {
                lat: coordinates.lat(),
                lng: coordinates.lng(),
            },
            disableDefaultUI: true,
        });
    };

    // Loads all journals and sets them to journals
    function loadJournals() {
        API.getJournals()
            .then(res =>
                setJournals(res.data)
            )
            .catch(err => console.log(err));

        // console.log(journals); // object empty here

    };

    // console.log(journals); // object full here


    // Deletes a journal from the database with a given id, then reloads journals from the db
    function deleteJournal(id) {
        API.deleteJournal(id)
            .then(res => loadJournals())
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveJournal method to save the journal data
    // Then reload journals from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        let lat, lng;


        googleMap = new window.google.maps.Geocoder().geocode({ 'address': formObject.place }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
                console.log(`results[0].geometry.location ${results[0].geometry.location}`);
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
                // console.log(lat);
                // console.log(lng);

                createGoogleMap(results[0].geometry.location);

                new window.google.maps.Marker({
                    position: { lat, lng },
                    map: googleMap,
                    animation: window.google.maps.Animation.DROP,
                });

                // CONVERT DATE FORMAT BY DAYJS
                console.log(`formObject.date=${formObject.date}`);
                let formatted_date = dayjs(formObject.date).format('MMMM DD, YYYY')
                // console.log(`formatted_date=${formatted_date}`)

                // SAVE LATEST PLACE INTO JOURNAL DATABASE
                if (formObject.place && formObject.date) {
                    API.saveJournal({
                        trip: formObject.trip,
                        place: formObject.place,
                        date: formatted_date,
                        placeDetail: formObject.placeDetail,
                        center: {
                            "lat": lat,
                            "lng": lng
                        }
                    })
                        .then(res => loadJournals())
                        .catch(err => console.log(err));
                }

                // SET LATEST PLACE INPUT AS A VARIABLE
                setLatestPlace({
                    "center": {
                        "lat": lat,
                        "lng": lng,
                    },
                    "place": formObject.place,
                });
            }
        });

    }; // HANDLE SUBMIT

    console.log(journals);  // ARRAY OBJECT FULL HERE



    return (
        <Container fluid>

            <Row>

                <Col size="md-9">

                    <Jumbotron>
                        <h1>Start Adding New Trip Here</h1>
                    </Jumbotron>


                    <div
                        id="google-map"
                        ref={googleMapRef}
                        style={{ width: "100%", height: "300px" }}
                    />

                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="trip"
                            placeholder="add trip name (required)"
                        />
                        <Input
                            disabled={!(formObject.trip)}
                            onChange={handleInputChange}
                            name="place"
                            placeholder="add place (required)"
                        />
                        <Input
                            disabled={!(formObject.trip)}
                            onChange={handleInputChange}
                            type="date"
                            name="date"
                        />
                        <TextArea
                            disabled={!(formObject.trip)}
                            onChange={handleInputChange}
                            name="placeDetail"
                            placeholder="Tell us about this place (required)"
                        />
                        <FormBtn
                            disabled={!(formObject.trip && formObject.place && formObject.date && formObject.placeDetail)}
                            onClick={handleFormSubmit}
                        >
                            Submit Journal
                        </FormBtn>
                    </form>


                </Col>


                <Col size="md-3 sm-12">
                    <Jumbotron>
                        <h1>Places On My List</h1>
                    </Jumbotron>

                    {journals.length ? (
                        <List>
                            {journals.map(journal => (
                                <ListItem key={journal._id}>
                                    <Link to={"/journals/" + journal._id}>
                                        <strong>
                                            {journal.trip} : {journal.place} on {journal.date}
                                        </strong>
                                    </Link>
                                    <DeleteBtn onClick={() => deleteJournal(journal._id)} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <h3>No Results to Display</h3>
                    )}
                </Col>

            </Row>

        </Container>
    )
}

export default Journals



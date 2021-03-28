import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

import GoogleMapReact from 'google-map-react';


import Maps from "../components/Maps";

// FOR ANOTHER MAPS NPM
// import { Map, GoogleMapReact, Marker } from 'google-maps-react';
// import MapContainer from "../components/Maps";


// let map;
// let service;
// let infowindow;

let geoSearch = {
    center: {
        lat: "",
        lng: ""
    },
    place: "",
};


function Journals() {


    // Setting our component's initial state
    const [journals, setJournals] = useState([])
    const [formObject, setFormObject] = useState({})

    // Load all journals and store them with setJournals
    useEffect(() => {
        loadJournals()
    }, [])

    // Loads all journals and sets them to journals
    function loadJournals() {
        API.getJournals()
            .then(res =>
                setJournals(res.data)
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads journals from the db
    function deleteJournal(id) {
        API.deleteJournal(id)
            .then(res => loadJournals())
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })

        // getLatLng(formObject.place);
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload journals from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.place && formObject.date) {
            API.saveJournal({
                place: formObject.place,
                date: formObject.date,
                placeDetail: formObject.placeDetail
            })
                .then(res => loadJournals())
                .catch(err => console.log(err));
        }

        geoSearchResult(formObject.place);

    };

    ////////////////////////////////////////////////////////////////////////////////////////

    // add function to find geolocation of the place lat long
    // then add into the formObject or another object call placeGeo
    // before pass to Map component

    // const placeSearch = {};
    // const geoSearchResult = {

    //     // center: {
    //     //     lat: 13.736717,
    //     //     lng: 100.523186
    //     // },
    //     // place: 'Thailand',

    //     center: {
    //         lat: 66.160507,
    //         lng: -153.369141
    //     },
    //     place: 'Alaska',

    // center: {
    //             lat: 52.3555,
    //             lng: 1.1743
    //         },
    //         place: 'England',

    // }

    ////////////////////////////////////////////////////////////////////////////////////////
    const geoSearchResult = (placeSearch) => {
        let lat, lng;

        new window.google.maps.Geocoder().geocode({ 'address': `${placeSearch}` }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
                // createGoogleMap(results[0].geometry.location);
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();

                console.log(`placeSearch=${placeSearch}`);
                console.log(`lat=${lat}`);
                console.log(`lng=${lng}`);

                let geoSearch = {
                    center: {
                        "lat": lat,
                        "lng": lng
                    },
                    "place": placeSearch,
                }

                console.log(`geoSearch.center.lat=${geoSearch.center.lat}`);
                console.log(`geoSearch.place=${geoSearch.place}`);

                return geoSearch;

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }


    console.log(geoSearch);
    console.log(`geoSearch.center.lat=${geoSearch.center.lat}`);
    console.log(`geoSearch.place=${geoSearch.place}`);
    ////////////////////////////////////////////////////////////////////////////////////////


    // let placeSearch = formObject.place;
    // function geoLocationSearch(placeSearch) {

    //     console.log(placeSearch);

    //     // infowindow = new google.maps.InfoWindow();
    //     var map = new google.maps.Map(document.getElementById("map"));

    //     const request = {
    //         query: placeSearch,
    //         fields: ["name", "geometry"]
    //     };

    //     const service = new google.maps.places.PlacesService();
    //     service.findPlaceFromQuery(request, (results, status) => {
    //         if (status === google.maps.places.PlacesServiceStatus.OK) {
    //             console.log("results.length = " + results.length);

    //             for (let i = 0; i < results.length; i++) {

    //                 var latitude = results[i].geometry.location.lat();
    //                 var longitude = results[i].geometry.location.lng();

    //                 // Make an Object
    //                 const geoSearchResult = {
    //                     center: {
    //                         lat: latitude,
    //                         lng: longitude
    //                     },
    //                     place: placeSearch,
    //                 }

    //             }
    //         }
    //     });

    // };

    ////////////////////////////////////////////////////////////////////////////////////////


    return (
        <Container fluid>

            <Row>

                <Col size="md-9">

                    <Jumbotron>
                        <h1>Start Adding New Trip Here</h1>
                    </Jumbotron>

                    <div>
                        <Maps id="map" center={geoSearchResult.center} place={geoSearchResult.place} />
                    </div>


                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="place"
                            placeholder="add place (required)"
                        />
                        <Input
                            onChange={handleInputChange}
                            type="date"
                            name="date"
                        />
                        <TextArea
                            onChange={handleInputChange}
                            name="placeDetail"
                            placeholder="Tell us about this place (required)"
                        />
                        <FormBtn
                            disabled={!(formObject.place && formObject.date && formObject.placeDetail)}
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
                                            {journal.place} on {journal.date}
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

import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

import Maps from "../components/Maps";
import GoogleMapReact from 'google-map-react';




function Journals() {

    let googleMap;


    // Setting our component's initial state
    const [journals, setJournals] = useState([])
    const [formObject, setFormObject] = useState({})
    const [latestPlace, setLatestPlace] = useState({})

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
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload journals from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        let lat, lng;

        googleMap = new window.google.maps.Geocoder().geocode({ 'address': formObject.place }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
                // console.log(`Geocoder results[0].formatted_address ${results[0].formatted_address}`);
                console.log(`results[0].geometry.location ${results[0].geometry.location}`);
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
                // console.log(lat);
                // console.log(lng);

                new window.google.maps.Marker({
                    map: googleMap,
                    animation: window.google.maps.Animation.DROP,
                    position: {lat, lng},
                    title: formObject.place
                });

                if (formObject.place && formObject.date) {
                    API.saveJournal({
                        place: formObject.place,
                        date: formObject.date,
                        placeDetail: formObject.placeDetail,
                        // lat: 51.509865,
                        // lng: -0.118092,
                        "lat": lat,
                        "lng": lng,
                    })
                        .then(res => loadJournals())
                        .catch(err => console.log(err));
                }

                setLatestPlace({
                    "center": {
                        "lat": lat,
                        "lng": lng,
                    },
                    "place": formObject.place,
                });
            }
        });

    };

    // function geoSearchResult(placeSearch) {
    //     let lat, lng;

    //     new window.google.maps.Geocoder().geocode({ 'address': `${placeSearch}` }, function (results, status) {
    //         if (status === window.google.maps.GeocoderStatus.OK) {
    //             // console.log(`Geocoder results[0].formatted_address ${results[0].formatted_address}`);
    //             console.log(`results[0].geometry.location ${results[0].geometry.location}`);
    //             lat = results[0].geometry.location.lat();
    //             lng = results[0].geometry.location.lng();

    //             new window.google.maps.Marker({
    //                 map: googleMap,
    //                 animation: window.google.maps.Animation.DROP,
    //                 position: results[0].geometry.location
    //             });

    //             setLatestPlace({
    //                 "center": {
    //                     "lat": lat,
    //                     "lng": lng,
    //                 },
    //                 "place": placeSearch,
    //             });


    //         } else {
    //             alert('Geocode was not successful for the following reason: ' + status);
    //         }
    //     });

    //     // console.log(`latestPlace.center=${latestPlace.center}`)
    //     // console.log(`latestPlace.place=${latestPlace.place}`)
    //     // return latestPlace;
    // }


    ///// OUTSIDE FUNCTION LOOP CONST WILL SHOW VALUE HERE /////
    // console.log(latestPlace.center);
    // console.log(latestPlace.place);
    // console.log(`latestPlace.center=${latestPlace.center}`)
    // console.log(`latestPlace.place=${latestPlace.place}`)
    // console.log(journals);



    return (
        <Container fluid>

            <Row>

                <Col size="md-9">

                    <Jumbotron>
                        <h1>Start Adding New Trip Here</h1>
                    </Jumbotron>

                    <div>
                        {/* <Maps id="map" center={{lat: 46.227638, lng: 2.213749}} place="France" /> */}
                        <Maps id="map" center={latestPlace.center} place={latestPlace.place} />
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

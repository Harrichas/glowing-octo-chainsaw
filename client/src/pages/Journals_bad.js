import React, { useState, useEffect, useRef } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

import dayjs from 'dayjs';

import Maps from "../components/Maps";
import GM from "../components/GoogleMap";

// import GoogleMapReact from 'google-map-react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"


function Journals() {

    let googleMap;
    const googleMapRef = useRef();


    // Setting our component's initial state
    const [journals, setJournals] = useState([])
    const [formObject, setFormObject] = useState({})
    const [latestPlace, setLatestPlace] = useState({})

    // Load all journals and store them with setJournals
    useEffect(() => {
        loadJournals()
        


        // const googleMapScript = document.createElement("script");
        // googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        // googleMapScript.async = true;
        // window.document.body.appendChild(googleMapScript);
        // googleMapScript.addEventListener("load", () => {
        // // getLatLng();
        // });
        

        

    }, [])


    // const createGoogleMap = (coordinates) => {
    //     googleMap = new window.google.maps.Map(googleMapRef.current, {
    //         zoom: 6,
    //         center: {
    //             lat: coordinates.lat(),
    //             lng: coordinates.lng(),
    //         },
    //         disableDefaultUI: true,
    //     });
    // };

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
                console.log(`results[0].geometry.location ${results[0].geometry.location}`);
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
        

                // // createGoogleMap(results[0].geometry.location);
                
                // lat = results[0].geometry.location.lat();
                // lng = results[0].geometry.location.lng();
                // new window.google.maps.Marker({
                //     position: { lat, lng },
                //     map: googleMap,
                //     animation: window.google.maps.Animation.DROP,
                //     // title: `${formObject.place}`,
                // });

                // CONVERT DATE FORMAT BY DAYJS
                console.log(`formObject.date=${formObject.date}`);
                let formatted_date = dayjs(formObject.date).format('MMMM DD, YYYY')
                console.log(`formatted_date=${formatted_date}`)

                // SAVE LATEST PLACE INTO JOURNAL DATABASE
                if (formObject.place && formObject.date) {
                    API.saveJournal({
                        trip: formObject.trip,
                        place: formObject.place,
                        date: formatted_date,
                        // date: dayjs('2019-01-25').format('DD/MM/YYYY'),
                        placeDetail: formObject.placeDetail,
                        // lat: 51.509865,
                        // lng: -0.118092,
                        "lat": lat,
                        "lng": lng,
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

    };

    console.log(journals);
    console.log(latestPlace);




    return (
        <Container fluid>

            <Row>

                <Col size="md-9">

                    <Jumbotron>
                        <h1>Start Adding New Trip Here</h1>
                    </Jumbotron>

                    <GM center={{lat: 46.227638, lng: 2.213749}} />
                    

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


// PREVIOUSLY USED ON MAP
{ /*

    <div>
    <Maps id="map" center={{lat: 46.227638, lng: 2.213749}} place="France" />
    <Maps id="map" center={latestPlace.center} place={latestPlace.place} />
    </div>
    
    
    */ }


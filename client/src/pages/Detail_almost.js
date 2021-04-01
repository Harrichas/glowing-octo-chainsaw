import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import Maps from "../components/Maps";
import { List, ListItem } from "../components/List";

const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"

function Detail() {
  const [journal, setJournal] = useState({})

  let googleMap, lat, lng;
  const googleMapRef = useRef();

  // When this component mounts, grab the journal with the _id of props.match.params.id
  // e.g. localhost:3000/journals/599dcb67f0f16317844583fc
  const { id } = useParams()
  useEffect(() => {
    API.getJournal(id)
      .then(res => setJournal(res.data))
      .catch(err => console.log(err));


    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      getLatLng();
    });

  }, [])

  console.log(`Details.js journal=${journal}`)
  console.log(`Details.js journal.lat=${journal.lat}`)
  console.log(`Details.js journal.lng=${journal.lng}`)


  const createGoogleMap = (journal) => {
    let lat = 51.509865;
    let lng = -0.118092;
    googleMap = new window.google.maps.Map(googleMapRef.current, {
      zoom: 6,
      center: {
        // lat: journal.lat(),
        // lng: journal.lng(),
        lat: lat,
        lng: lng,
      },
      disableDefaultUI: true,
    });
  };

  const getLatLng = (journal) => {

    console.log(`getLatLng journal=${journal}`)

    createGoogleMap(journal);
    // lat = journal.lat();
    // lng = journal.lng();
    let lat = 51.509865;
    let lng = -0.118092;
    new window.google.maps.Marker({
        position: { lat, lng },
        map: googleMap,
        animation: window.google.maps.Animation.DROP,
    });

  };



  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {journal.trip}
            </h1>
          </Jumbotron>

          <div
            id="google-map"
            ref={googleMapRef}
            style={{ width: "100%", height: "300px" }}
          />

        </Col>
      </Row>
      <Row>
        <Col size="md-12 md-offset-1">
          <List>
            {/* <h1>About This Place</h1> */}
            <h4>{journal.place} - {journal.date}</h4>
            <p>
              {journal.placeDetail}
            </p>

          </List>

        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/">← Back to Add more Places</Link>
        </Col>
      </Row>
    </Container>
  );
}


export default Detail;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import Maps from "../components/Maps";
import { List } from "../components/List";

// const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"

function Detail(props) {
<<<<<<< HEAD

=======
>>>>>>> origin/main
  const [clickPlace, setClickPlace] = useState({})

  // When this component mounts, grab the journal with the _id of props.match.params.id
  // e.g. localhost:3000/journals/599dcb67f0f16317844583fc
  const { id } = useParams()
  useEffect(() => {
    API.getJournal(id)
      .then(res => setClickPlace(res.data))
      .catch(err => console.log(err));
  }, [])

  // console.log(`Details.js clickPlace.lat=${clickPlace.lat}`)
  // console.log(`Details.js clickPlace.lng=${clickPlace.lng}`)

  return (
<<<<<<< HEAD
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {clickPlace.trip}
            </h1>
          </Jumbotron>

          <Maps id="map" center={{ "lat": clickPlace.lat, "lng": clickPlace.lng }} place={clickPlace.place} />

        </Col>
      </Row>
      <Row>
        <Col size="md-12 md-offset-1">
          <List>
              {/* <h1>About This Place</h1> */}
              <h4>{clickPlace.place} - {clickPlace.date}</h4>
=======
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {clickPlace.place} on {clickPlace.date}
              </h1>
            </Jumbotron>

            <Maps id="map" center={clickPlace.center} place ={clickPlace.place} />

          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>About This Place</h1>
>>>>>>> origin/main
              <p>
                {clickPlace.placeDetail}
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

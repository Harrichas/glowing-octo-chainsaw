import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import Maps from "../components/Maps";
import { List } from "../components/List";
import GMaps from "../components/GMaps";


function Detail() {
  const [clickPlace, setClickPlace] = useState({
    place: "",
    // center: {
    //   lat: "",
    //   lng: "",
    // },
    lat: "",
    lng: "",
  })

  // When this component mounts, grab the journal with the _id of props.match.params.id
  // e.g. localhost:3000/journals/599dcb67f0f16317844583fc
  const { id } = useParams()
  useEffect(() => {
    API.getJournal(id)
      .then(res => setClickPlace(res.data))
      .catch(err => console.log(err));

  }, [])

  console.log(clickPlace);
  console.log(`Details.js clickPlace.place=${clickPlace.place}`)
  console.log(`Details.js clickPlace.lat=${clickPlace.lat}`)
  console.log(`Details.js clickPlace.lng=${clickPlace.lng}`)

  const singlePlace = [

    {
      "place": clickPlace.place,
      "lat": clickPlace.lat,
      "lng": clickPlace.lng,
    },
  //   // {
  //   //   "place": "Singapore",
  //   //   "lat": 1.1796035905923454,
  //   //   "lang": 103.49073752721172,
  //   //  },
  ]

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {clickPlace.place}
            </h1>
            <h2>
              {clickPlace.date}
            </h2>
          </Jumbotron>

          {/* <Maps id="map" center={clickPlace.center} place={clickPlace.place} /> */}
          {/* <GMaps center={clickPlace.center} place={clickPlace.place} /> */}
          <GMaps userListArr={singlePlace} />



        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <h1>About This Place</h1>
            <p>
              {clickPlace.placeDetail}
            </p>
          </article>
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/journals">← Back to Add more Places</Link>
        </Col>
      </Row>
    </Container>
  );
}


export default Detail;

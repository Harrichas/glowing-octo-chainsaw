import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import GMaps from "../components/GMaps"


function Detail() {
  const singlePlace = 
    {
      "place": "",
      "lat": "",
      "lang": "",
      "lng": "",
    }
  ;
  const [clickPlace, setClickPlace] = useState(singlePlace)

  // When this component mounts, grab the journal with the _id of props.match.params.id
  // e.g. localhost:3000/journals/599dcb67f0f16317844583fc
  const { id } = useParams()
  useEffect(() => {
    API.getJournal(id)
      .then(res => setClickPlace(res.data[0]))
      .catch(err => console.log(err));
        // eslint-disable-next-line
  }, [])

  // console.log(`Details.js clickPlace.lat=${clickPlace.lat}`)
  // console.log(`Details.js clickPlace.lng=${clickPlace.lng}`)

  // console.log(clickPlace);


  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {clickPlace.place} on {clickPlace.date}
            </h1>
          </Jumbotron>

          {/* <Maps id="map" center={clickPlace.center} place={clickPlace.place} /> */}
          <GMaps userListArr={[clickPlace]} />

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

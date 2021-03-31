import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import Maps from "../components/Maps";


function Detail(props) {
  const [journal, setJournal] = useState({})

  // When this component mounts, grab the journal with the _id of props.match.params.id
  // e.g. localhost:3000/journals/599dcb67f0f16317844583fc
  const {id} = useParams()
  useEffect(() => {
    API.getJournal(id)
      .then(res => setJournal(res.data))
      .catch(err => console.log(err));
  }, [])

  // console.log(`Details.js journal.lat=${journal.lat}`)
  // console.log(`Details.js journal.lng=${journal.lng}`)

  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {journal.place} on {journal.date}
              </h1>
            </Jumbotron>

            <Maps id="map" center={{"lat":journal.lat, "lng":journal.lng}} place ={journal.place} />

          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>About This Place</h1>
              <p>
                {journal.placeDetail}
              </p>
            </article>
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

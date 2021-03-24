import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

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
    };





    return (
        <Container fluid>

            <Row>
                <Col size="md-6">

                    <Jumbotron>
                        <h1>Start Adding New Trip Here</h1>
                    </Jumbotron>

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


                <Col size="md-6 sm-12">
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

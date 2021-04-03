{
    journals.map(journal => (

    <Maps id="map" center={journal.center}/>

    <ListItem key={journal._id}>
        <Link to={"/journals/" + journal._id}>
            <strong>
            {journal.trip} : {journal.place} on {journal.date}
            </strong>
        </Link>
        <DeleteBtn onClick={() => deleteJournal(journal._id)} />
    </ListItem>


    ))
}



{
    this.props.length ? (
        {
            this.props.map(journal => (
                <Marker key={journal._id}>
                    lat={this.props.center.lat}
                    lng={this.props.center.lng}
                </Marker>
            ))
        }
    ) : (
        <h3>No Results to Display</h3>
    )
}



{center: {…}, _id: "6066b68756316427482086d0", trip: "Global Trip", place: "Vietnam", date: "April 14, 2021", …}



2:
center: {lat: 14.058324, lng: 108.277199}
date: "April 14, 2021"
place: "Vietnam"
placeDetail: "dafsfafsa"
trip: "Global Trip"
__v: 0
_id: "6066b68756316427482086d0"
__proto__: Object
length: 3
__proto__: Array(0)
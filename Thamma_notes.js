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
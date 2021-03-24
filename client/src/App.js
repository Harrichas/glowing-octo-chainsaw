import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Books from "./pages/Books";
import Journals from "./pages/Journals";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>

        <Nav />

        <Switch>

          {/* <Route exact path={["/", "/books"]}> */}
          <Route exact path={["/", "/journals"]}>
            {/* <Books /> */}
            <Journals />
          </Route>

          {/* <Route exact path="/books/:id"> */}
          <Route exact path="/journals/:id">
            <Detail />
          </Route>

          <Route>
            <NoMatch />
          </Route>
          
        </Switch>


      </div>
    </Router>
  );
}

export default App;

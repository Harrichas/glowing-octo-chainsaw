import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Books from "./pages/Books";
import Journals from "./pages/Journals";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Oauth from "./pages/Oauth";


function App() {
  return (
    <Router>
      <div>
        <Nav>
        </Nav>
        <Switch>


          <Route exact path="/">
            <Oauth />
          </Route>

          <Route exact path="/journals">
            <Journals />
          </Route>

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

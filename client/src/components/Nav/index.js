import React from "react";

function Nav() {
  return (
    <nav 
      // className="navbar navbar-expand-lg navbar-dark bg-success"
      style={{ height: 150, clear: "both", paddingTop: 40, textAlign: "center" , paddingRight: 0}}
      >
      <a className="navbar-brand" href="/">
        <h1>LET'S GO PLACES!</h1>
      </a>
    </nav>
  );
}

export default Nav;

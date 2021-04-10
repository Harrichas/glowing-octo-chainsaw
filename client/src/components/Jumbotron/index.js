import React from "react";
import '../Jumbotron/jumbotron.css'
function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 50, clear: "both", paddingTop: 10, textAlign: "center", paddingRight: 0, paddingBottom: 2, }}
      className="newTrip"
    >
      {children}
    </div>
  );
}

export default Jumbotron;

import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 50, clear: "both", paddingTop: 10, textAlign: "center", paddingRight: 0 }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;

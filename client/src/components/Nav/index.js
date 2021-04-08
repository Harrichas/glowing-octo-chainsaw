import React from "react";
import "./style.css"

function Nav() {
  return (
    <header className="header" style={{ height: 150, clear: "both", paddingTop: 40, textAlign: "center" , paddingRight: 0}}>
      <a href="/" className="navbar-brand">
        <h1>LET'S GO PLACES!</h1>
        </a>
      <input className="menu-btn" type="checkbox" id="menu-btn"/>
      <label className="menu-icon" id="menu-btn"><span className="nav-icon"></span></label>
      <ul className="menu">
        <li className="profile"><a href="/">Logout</a><img src="" alt=""/></li>
      </ul>
    </header>
  );
}

export default Nav;

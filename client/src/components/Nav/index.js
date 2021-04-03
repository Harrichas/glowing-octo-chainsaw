import React from "react";
import "./style.css"

function Nav() {
  return (
    <header class="header" style={{ height: 150, clear: "both", paddingTop: 40, textAlign: "center" , paddingRight: 0}}>
      <a href="/" className="navbar-brand">
        <h1>LET'S GO PLACES!</h1>
        </a>
      <input class="menu-btn" type="checkbox" id="menu-btn"/>
      <label class="menu-icon" for="menu-btn"><span class="nav-icon"></span></label>
      <ul class="menu">
        <li class="profile"><a href="logout">Logout</a><img src="" /></li>
      </ul>
    </header>
  );
}

export default Nav;

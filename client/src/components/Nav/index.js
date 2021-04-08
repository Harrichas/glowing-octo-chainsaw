import React, {useState} from "react" ;
import "./style.css";
import AuthManager from "../../utils/AuthManager";

function Nav() {

  const [isUserLoggedIn, undefined] = useState(AuthManager.isAuthenticated());

  return (
    <header className="header" style={{ height: 150, clear: "both", paddingTop: 40, textAlign: "center" , paddingRight: 0}}>
      <a href="/" className="navbar-brand">
        <h1>LET'S GO PLACES!</h1>
      </a>
      <input class="menu-btn" type="checkbox" id="menu-btn"/>
      <label class="menu-icon" for="menu-btn"><span class="nav-icon"></span></label>
      <ul class="menu">
        <li class="profile">
          {
            isUserLoggedIn ?
            <>
              <a href="http://localhost:3001/google/logout">Logout</a>
              <img src="" alt=""/>
            </> : ""
          }

        </li>
      </ul>
    </header>
  );
}

export default Nav;

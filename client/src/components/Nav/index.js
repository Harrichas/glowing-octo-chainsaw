import React, {useState} from "react" ;
import "./style.css";
import AuthManager from "../../utils/AuthManager";
import GUser from "../GUser"

function Nav() {

  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(AuthManager.isAuthenticated());

  return (
    <header className="header" style={{ height: 180, clear: "both", textAlign: "center" , paddingRight: 0}}>
      <GUser/>
      <a href="/" className="logo">
        <h1>LET'S GO PLACES!</h1>
      </a>
      <label className="menu-icon" for="menu-btn"><span className="nav-icon"></span></label>
      <ul className="menu">
        <li className="profile">
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

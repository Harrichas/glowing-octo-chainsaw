import React, {useState} from "react" ;
import "./style.css";
import AuthManager from "../../utils/AuthManager";
import GUser from "../GUser"

function Nav() {

  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(AuthManager.isAuthenticated());

  return (
    <header className="header nav-bar" style={{ height: 180, clear: "both", textAlign: "center" , paddingRight: 0}}>
      {
        isUserLoggedIn ?
        <GUser/> : <div style={{ margin: 15, width: 0}}/>
      }
      <a href="/" className="navbar">
        <h1>let's go places.</h1>
      </a>
      <label className="menu-icon" for="menu-btn"><span className="nav-icon"></span></label>
      <ul className="menu">
        <li className="profile">
          {
            isUserLoggedIn ?
            <>
              <a href="https://sheltered-plateau-62064.herokuapp.com/google/logout">Logout</a>
            </> : ""
          }

        </li>
      </ul>
    </header>
  );
}

export default Nav;

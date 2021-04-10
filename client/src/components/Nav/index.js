import React, {useState} from "react" ;
import "./style.css";
import AuthManager from "../../utils/AuthManager";

function Nav() {

  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(AuthManager.isAuthenticated());

  return (
    <header className="header" style={{ height: 150, clear: "both", paddingTop: 40, textAlign: "center" , paddingRight: 0}}>
      <a href="/" className="nav-bar">
        <h1 className='title'>let's go places.</h1>
      </a>
      <input className="menu-btn" type="checkbox" id="menu-btn"/>
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

import React, {useState} from "react" ;
import "./style.css";
import AuthManager from "../../utils/AuthManager";

function Nav() {

  const [isUserLoggedIn, undefined] = useState(AuthManager.isAuthenticated());

  return (
    <header className="header" style={{ height: 150, clear: "both", paddingTop: 40, textAlign: "center" , paddingRight: 0}}>
      <a href="/" className="navbar-brand">
        <h1>LET'S GO PLACES!</h1>
<<<<<<< HEAD
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
=======
        </a>
      <input className="menu-btn" type="checkbox" id="menu-btn"/>
      <label className="menu-icon" id="menu-btn"><span className="nav-icon"></span></label>
      <ul className="menu">
        <li className="profile"><a href="/">Logout</a><img src="" alt=""/></li>
>>>>>>> 1cffbf45ce2729d6b2537f30a953e4eb4d8e7009
      </ul>
    </header>
  );
}

export default Nav;

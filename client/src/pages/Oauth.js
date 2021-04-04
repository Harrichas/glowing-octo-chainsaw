import React, {useState} from "react";
import API  from "../utils/API";
import AuthManager from "../utils/AuthManager";


function Oauth() {

  const [isUserLoggedIn, undefined] = useState(AuthManager.isAuthenticated());

  const loadJournals = () => {
    API.getJournals().then(response => {
      console.log(response.data);
    });
  }

  return (
    <>
      {
        isUserLoggedIn ?  
          <a href="http://localhost:3001/google/logout">Logout</a> :
          <a href="http://localhost:3001/google">Login</a>
      }

      <br />
      <button onClick={loadJournals}>Load Journals</button>
    </>
  );
}

export default Oauth;

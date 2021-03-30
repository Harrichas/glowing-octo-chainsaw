import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios"

function Oauth() {
  return (
    // <GoogleLogin
    // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    // buttonText="Login"
    // onSuccess={responseGoogle}
    // onFailure={responseGoogle}
    // cookiePolicy={'single_host_origin'}
    // />,
    <a href="http://localhost:3001/google">login</a>                                  
  );
}

export default Oauth;

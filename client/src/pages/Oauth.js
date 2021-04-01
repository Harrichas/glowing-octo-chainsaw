import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios"

function Oauth() {
  return (
    // <GoogleLogin
    // clientId="670481464868-go88dp8iupprk1325q2eskmfgn1fdf8r.apps.googleusercontent.com"
    // buttonText="Login"
    // onSuccess={responseGoogle}
    // onFailure={responseGoogle}
    // cookiePolicy={'single_host_origin'}
    // />,
    <a href="http://localhost:3000/google">login</a>                                  
  );
}

export default Oauth;

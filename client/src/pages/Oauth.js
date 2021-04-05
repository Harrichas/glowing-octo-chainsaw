import React from "react";

function Oauth() {
  return (
    // <a href="http://localhost:3001/google">login</a>// !!!!!!!! change to heroku 
    <div className="row d-flex justify-content-center">
        <div class="col-md-4 col-offset-md-4 col-xs-12 mt-5">
            <a class="btn btn-lg btn-google btn-block btn-outline border rounded" href="/google">
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" style={{ marginRight: '7px', marginBottom: '3px' }} /> 
                Login With Google
            </a>
        </div>
    </div>
  );
}

export default Oauth;

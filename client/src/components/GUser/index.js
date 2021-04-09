import React, { useState, useEffect } from "react";
import "./style.css";

import API from "../../utils/API";


function GUser() {

  const [loginUser, setLoginUser] = useState([]);


  useEffect(() => {
    loadUsers()

  }, [])

  function loadUsers() {
    API.getUsers()
      .then(res =>
        setLoginUser(res.data[0])
      )
      .catch(err => console.log(err));
  };

  // console.log(loginUser);

  let style = {
    margin: '20px',

  }

  return (
    <div style={style}>

      <h1>{loginUser.username}</h1>
      <img src={loginUser.avatar} alt=""/>

    </div>

  );
}

export default GUser;

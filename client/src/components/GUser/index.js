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
    <div style={style} className="user">
      <h1>{loginUser.username}?</h1>
      <img src={loginUser.avatar} alt="" class="userImg"/>

    </div>

  );
}

export default GUser;

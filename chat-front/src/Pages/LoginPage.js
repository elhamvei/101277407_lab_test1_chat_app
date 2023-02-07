import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const LoginPage = (props) => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const loginUser = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:5000/user/login", {
        username,
        password,
      })
      .then((response) => {
        alert("success", response.data.message);
        localStorage.setItem("UI_Token", response.data.token);
        props.history.push("/dashboard");
        props.setupSocket();
      })
      .catch((err) => {
        // console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          alert("error", err.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">USER NAME:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            ref={usernameRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">PASSWORD:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>
        <button style={{backgroundColor:'lightblue'}} onClick={loginUser}>Login</button>
        <br/>
        <br/>
        <button style={{backgroundColor:'lightgreen'}} onClick={()=> document.location.href= '/register'}>Register</button>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);

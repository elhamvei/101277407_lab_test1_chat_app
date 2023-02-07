import React from "react";
import axios from "axios";
import makeAlert from "../Alert";

const RegisterPage = (props) => {
  const usernameRef = React.createRef();
  const firstnameRef = React.createRef();
  const lastnameRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = (props) => {
    const username = usernameRef.current.value;
    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:5000/user/register", {
        username,
        firstname,
        lastname,
        password,
        createon : new Date()
      })
      .then((response) => {
        makeAlert("success", response.data.message);
        const timeout = setTimeout(()=>{
          clearTimeout(timeout);
          document.location.href = '/login';
        },3000)
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeAlert("error", err.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Registration</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            ref={usernameRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            ref={firstnameRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="lastname"
            ref={lastnameRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={registerUser}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;

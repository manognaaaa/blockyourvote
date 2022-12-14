import { get } from "http";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form} from "react-bootstrap";


function AdminLogin() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "admin",
      password: "admin@123"
    }
  ];

  const errors = {
    uname: "User not found",
    pass: "Invalid Password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <div className="title">Sign In</div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" name="uname" placeholder="Username" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <input type="password" name="pass" placeholder="Password" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
      <div className="adminlogin">
      <div className="login-form">
        {isSubmitted ? <div>
          User access authorized!
          <br></br>
          <br></br>
          <button>
          <a href="/newpoll" style={{fontSize: "14px"}}>Create a new poll</a>
          </button>
          <button>
          <a href="/newvoters" style={{fontSize: "14px"}}>Add voters</a>
          </button>
        </div> : renderForm}
      </div>
    </div>
  );
}

export default AdminLogin;
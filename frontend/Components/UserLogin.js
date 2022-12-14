import { get } from "http";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form} from "react-bootstrap";


function UserLogin() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      voterid:"19BCN7188",
      voter:"Manogna"
    },
    {
      voterid:"19BCN7283",
      voter:"Kinshuk"
    },
    {
      voterid:"19BCE7411",
      voter:"Navin"
    }
  ];

  const errors = {
    vid: "User not found",
    vname: "Name doesn't match our records"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { vid,vname} = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.voterid === vid.value);

    // Compare user info
    if (userData) {
      if (userData.voter !== vname.value) {
        // Invalid password
        setErrorMessages({ name: "vname", message: errors.vname });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "vid", message: errors.vid });
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
      <div className="title">Voter Login</div>
      <form onSubmit={handleSubmit}>
      <div className="input-container">
          <input type="text" name="vid" placeholder="Voter Identification Number" required />
          {renderErrorMessage("vid")}
        </div>
        <div className="input-container">
          <input type="text" name="vname" placeholder="Name" required />
          {renderErrorMessage("vname")}
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
          <a href="/" style={{fontSize: "14px"}}>Proceed to vote</a>
          </button>
        </div> : renderForm}
      </div>
    </div>
  );
}

export default UserLogin;
import { get } from "http";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form} from "react-bootstrap";


function Comingsoon() {
  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <div className="title"></div>Page under construction...This page is a part of our future developments :)
      <form onSubmit={handleSubmit}>
      </form>
    </div>
  );

  return (
      <div className="adminlogin">
      <div className="login-form">
        {isSubmitted ? <div>
          Page under construction...This page is a part of our future developments :)
          <br></br>
          <br></br>
          <div className="button-container">
          <input type="submit" value="Home"/>
        </div>
        </div> : renderForm}
      </div>
    </div>
  );
}

export default Comingsoon;
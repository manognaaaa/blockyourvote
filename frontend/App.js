import "regenerator-runtime/runtime";
import React,{useState} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/global.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Card, Modal} from "react-bootstrap";
import ReactDOM from "react-dom";

//Components
import Home from "./Components/Home";
import NewPoll from "./Components/NewPoll";
import PollingStation from "./Components/PollingStation";
import AdminLogin from "./Components/AdminLogin";
import ShowResult from "./Components/ShowResult";
import UserLogin from "./Components/UserLogin";
import Comingsoon from "./Components/Comingsoon";
import Homepage from "./Components/Homepage";

export default function App({ isSignedIn, contractId, wallet}) {
  const callMethod = async (methodName, args = {}) => {
    wallet.callMethod({
      contractId: contractId,
      method: methodName,
      args: args,
    });
  };

  const viewMethod = async (methodName, args = {}) => {
    return await wallet.viewMethod({
      contractId: contractId,
      method: methodName,
      args: args,
    });
  };

  const signInFun = () => {
    wallet.signIn();
  };

  const signOutFun = () => {
    wallet.signOut();
  };

  const displayHome = () => {
    if (isSignedIn) {
      return (
        <Routes>
          <Route
            path='/'
            element={
              <Home
                wallet={wallet}
                callMethod={callMethod}
                viewMethod={viewMethod}
                changeCandidates={changeCandidatesFunction}
                checkResults={checkResultsFunction}
              />
            }
          ></Route>

          <Route
            path='/newpoll'
            element={
              <NewPoll
                wallet={wallet}
                callMethod={callMethod}
                viewMethod={viewMethod}
              />
            }
          ></Route>

          <Route
            path='/pollingstation'
            element={
              <PollingStation
                wallet={wallet}
                callMethod={callMethod}
                viewMethod={viewMethod}
              />
            }
          ></Route>

          <Route
            path='/adminlogin'
            element={<AdminLogin/>}
          ></Route>

          <Route
            path='/showresult'
            element={<ShowResult
              wallet={wallet}
              callMethod={callMethod}
              viewMethod={viewMethod}
            />}
          ></Route>

          <Route
            path='/userlogin'
            element={<UserLogin
              />}
          ></Route>

          <Route
            path='/comingsoon'
            element={<Comingsoon/>}
          ></Route>

        </Routes>
      );
    } 
    else {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: "#1e1e1e"
        }}> 
          <img style={{alignItems: "center", padding: "20", margin: "50"}}
            src={require('./assets/C1.gif')} width="700" height="700"></img><br/>
          <p style={{fontFamily: "sans-serif", fontSize: "50px", color: "white"}}>Your vote is in safe hands.</p>
        </div>
      );
    }
  };

  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await viewMethod("getCandidatePair", { prompt: prompt });
    await localStorage.setItem("Candidate1", namePair[0]);
    await localStorage.setItem("Candidate2", namePair[1]);
    await localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "PollingStation");
  };

  const checkResultsFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await viewMethod("getCandidatePair", { prompt: prompt });
    await localStorage.setItem("Candidate1", namePair[0]);
    await localStorage.setItem("Candidate2", namePair[1]);
    await localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "ShowResult");
  };

  return (
    <Router>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        {console.log(isSignedIn)}
        <Container>
          <Navbar.Brand href='/userlogin'>
            <img src={require('./assets/logo.png')} width="70" height="70"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link disabled={!isSignedIn} href='/adminlogin'>
                New Poll
              </Nav.Link>
              <Nav.Link onClick={isSignedIn ? signOutFun : signInFun}>
                {isSignedIn ? wallet.accountId : "Login"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {displayHome()}
    </Router>
  );
}

import { get } from "http";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = (props) => {
  const [candidate1URL, changeCandidate1Url] = useState(
    "https://cdn2.iconfinder.com/data/icons/material-line-thin/1024/option-256.png"
  );
  const [candidate2URL, changeCandidate2Url] = useState(
    "https://cdn2.iconfinder.com/data/icons/material-line-thin/1024/option-256.png"
  );
  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [candidate1Votes, changeVote1] = useState(0);
  const [candidate2Votes, changeVote2] = useState(0);
  const [prompt, changePrompt] = useState("--");

  const contractId = process.env.CONTRACT_NAME;

  useEffect(() => {
    const getInfo = async () => {
      let x = "localStorage";
      console.log("the prompt is", localStorage.prompt);
      // vote count stuff

      let promptName = localStorage.prompt;

      let voteCount = await props.viewMethod("getVotes", {
        prompt: promptName,
      });

      console.log(voteCount);
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);

      // // image stuff
      console.log(
        "url is ",
        await props.viewMethod("getUrl", {
          prompt: localStorage.getItem("prompt"),
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate1Url(
        await props.viewMethod("getUrl", {
          prompt: localStorage.getItem("prompt"),
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await props.viewMethod("getUrl", {
          prompt: localStorage.getItem("prompt"),
          name: localStorage.getItem("Candidate2"),
        })
      );

      changePrompt(localStorage.getItem("prompt"));

      // // vote checking stuff

      let didUserVote = await props.viewMethod("didParticipate", {
        prompt: localStorage.getItem("prompt"),
        user: props.wallet.accountId,
      });
      console.log("did user vote", didUserVote);

      await changeResultsDisplay(didUserVote);
      await changeButtonStatus(didUserVote);
    };

    getInfo();
  }, [showresults]);

  const addVote = async (index) => {
    changeButtonStatus(true);
    let receipt = await props
      .callMethod("addVote", {
        prompt: localStorage.getItem("prompt"),
        index: index,
      })
      .then(async () => {
        console.log("recording a prompt", localStorage.getItem("prompt"));
        console.log("user Account is", props.wallet.accountId);
        await props.callMethod("recordUser", {
          prompt: localStorage.getItem("prompt"),
          user: props.wallet.accountId,
        });
      })
      .then(async () => {
        let voteCount = await props.viewMethod("getVotes", {
          prompt: localStorage.getItem("prompt"),
        });
        return voteCount;
      })
      .then((voteCount) => {
        changeVote1(voteCount[0]);
        changeVote2(voteCount[1]);
        console.log(voteCount);
      });

    changeResultsDisplay(true);

    alert("Thanks for voting!");
  };

  return (
    <Container>
      <br></br>
      <center>
      <Row style={{fontSize: "25px"}}><center><b>{prompt}</b></center></Row>
        <br></br>
      <Row>
        <Col className='jutify-content-center d-flex' style={{ width: "20vw" }}>
          <Card>
            <Card.Body>
            <center>
          <Container style={{marginRight:"50px"}}>
            <p style={{fontFamily: "sans-serif", fontSize: "20px", color: "black"}}>Candidate 1</p>
            <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4"}}>
              <div
                style={{
                  display: "flex",
                  padding: "3vw",
                }}
              >
                
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                    alignItems: "center",
                  }}
                  src={candidate1URL}
                ></img>
                
              </div>
            </Row>
            <Row
              style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'
            >
              <button style={{width:"250px"}}
              disabled={buttonStatus} onClick={() => addVote(0)}>
                Vote
              </button>
            </Row>
          </Container>
          </center>
            </Card.Body>
          </Card>
        
        </Col>
        <Col></Col>
        <Col className='jutify-content-center d-flex' style={{ width: "20vw" }}>
        <Card>
            <Card.Body>
            <center>
          <Container style={{marginRight:"50px"}}>
            <p style={{fontFamily: "sans-serif", fontSize: "20px", color: "black"}}>Candidate 2</p>
            <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4"}}>
              <div
                style={{
                  display: "flex",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                    alignItems: "center",
                  }}
                  src={candidate2URL}
                ></img>
              </div>
            </Row>
            <Row
              style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'
            >
              <button style={{width:"250px"}}
              disabled={buttonStatus} onClick={() => addVote(1)}>
                Vote
              </button>
            </Row>
          </Container>
          </center>
            </Card.Body>
          </Card>
        
        </Col>
      </Row>
      </center>
    </Container>
  );
};

export default PollingStation;

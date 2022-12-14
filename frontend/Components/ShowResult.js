import { get } from "http";
import React, { useState, useEffect } from "react";
import { Table,Container, Row, Col, Button } from "react-bootstrap";
//Simport LoadingCircles from "../assets/loadingcircles.svg";

const ShowResults = (props) => {
  const [candidate1URL, changeCandidate1Url] = useState(
    "https://cdn2.iconfinder.com/data/icons/material-line-thin/1024/option-256.png"
  );
  const [candidate2URL, changeCandidate2Url] = useState(
    "https://cdn2.iconfinder.com/data/icons/material-line-thin/1024/option-256.png"
  );
  const candidateName1 = useState("Candidate 1");
  const candidateName2 = useState("Candidate 2");
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

      // vote count 

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
      <Row style={{fontSize: "25px"}}><center><b>{prompt} results</b></center></Row>
      <Table style={{ margin: "5vh" }} striped bordered hover>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Vote Count</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>{candidateName1}</th>
            <th>{candidate1Votes}</th>
          </tr>
          <tr>
            <th>{candidateName2}</th>
            <th>{candidate2Votes}</th>
          </tr>
        </tbody>
      </Table>  
      {/* <Row style={{fontSize: "25px"}}><center><b>Candidate 1 won!</b></center></Row>     */}
    </Container>
    
  );
};

export default ShowResults;

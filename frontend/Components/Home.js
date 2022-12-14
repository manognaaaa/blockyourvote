import { Near } from "near-api-js";
import React, { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
let contractId = process.env.CONTRACT_NAME;
console.log(contractId);

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);

  useEffect(() => {
    const getPrompts = async () => {
      let output = await props.viewMethod("getAllPrompts");
      console.log("output is", output);
      changePromptList(output);
    };

    getPrompts();
  }, []);

  const clearPolls = async () => {
    await props.callMethod("clearPromptArray");
    location.reload();
  };

  const getPrompts = async () => {
    console.log(await props.viewMethod("getAllPrompts"));
  };

  const addPrompt = async () => {
    await props.callMethod("addToPromptArray", {
      prompt: "user",
    });
    console.log("adding prompt");
  };

  return (
    <Container>
      <Row style={{fontSize: "25px"}}><center><b>Welcome to BlockYourVote!</b></center></Row>
      <Row style={{fontSize: "15px"}}><center><i>Remember to choose your vote properly, you only get to vote once :)</i></center></Row>
      <Table style={{ margin: "5vh" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>List of Polls</th>
            <th>Go to Poll</th>
            <th>Check Results</th>
          </tr>
        </thead>
        <tbody>
          {promptList.map((el, index) => {
            console.log(promptList);
            if (promptList) {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el}</td>
                  <td>
                    {" "}
                    <button onClick={() => props.changeCandidates(el)}>
                      Go to Poll
                      {console.log(el)}
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button onClick={() => props.checkResults(el)}>
                       Check Results
                      {console.log(el)}
                    </button>
                  </td>
                </tr>
              );
            } else {
              <tr>
                <td> no prompts</td>
              </tr>;
            }
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;

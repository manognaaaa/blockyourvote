import React, { useRef, useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const NewPoll = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();

  const candidateAge1 = useRef();
  const candidateAge2 = useRef();

  const candidateP1 = useRef();
  const candidateP2 = useRef();

  const promptRef = useRef();

  const [disableButton, changeDisable] = useState(false);

  const sendToBlockChain = async () => {
    changeDisable(true);

    // async viewMethod({ contractId, method, args = {} }) {

    // async callMethod({ contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT })

    await props.callMethod("addCandidatePair", {
      prompt: promptRef.current.value,
      name1: candidateName1.current.value,
      name2: candidateName2.current.value,
      url1: candidateName1URL.current.value,
      url2: candidateName2URL.current.value,
      age1: candidateAge1.current.value,
      age2: candidateAge2.current.value,
      p1: candidateP1.current.value,
      p2: candidateP2.current.value,
    });

    await props.callMethod("addToPromptArray", {
      prompt: promptRef.current.value,
    });

    await props
      .callMethod("initializeVotes", {
        prompt: promptRef.current.value,
      })
      .then(alert("head back to home page"));
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>Voting Prompt</Card.Title>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Prompt</Form.Label>
                <Form.Control
                  ref={promptRef}
                  placeholder='Add Prompt'
                ></Form.Control>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Row>

      <Row style={{ marginTop: "5vh" }}>

        <Col className='justify-content-center d-flex'>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Candidate 1</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                Enter candidate information
              </Card.Subtitle>
              <Form>
                <Form.Group className='mb-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    ref={candidateName1}
                    placeholder='Enter Candidate Name'
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    ref={candidateAge1}
                    placeholder='Enter Candidate Age'
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Contesting Party</Form.Label>
                  <Form.Control
                    ref={candidateP1}
                    placeholder='Enter Candidate Party'
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    ref={candidateName1URL}
                    placeholder='Enter Image URL'
                  ></Form.Control>
                </Form.Group>
              </Form>

            </Card.Body>
          </Card>
        </Col>

        <Col className='justify-content-center d-flex'>
          <Card style={{ width: "18rem" }}>
            {" "}
            <Card.Body>
              <Card.Title>Candidate 2</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                Enter candidate information
              </Card.Subtitle>
              <Form>
                <Form.Group className='mb-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    ref={candidateName2}
                    placeholder='Enter Candidate Name'
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    ref={candidateAge2}
                    placeholder='Enter Candidate Age'
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Contesting Party</Form.Label>
                  <Form.Control
                    ref={candidateP2}
                    placeholder='Enter Candidate Party'
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    ref={candidateName2URL}
                    placeholder='Enter Image URL'
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "10vh" }}>
        <center>
        <button style={{width:"250px"}}
          disabled={disableButton}
          onClick={sendToBlockChain}
          variant='primary'
        >
          Submit
        </button>
        </center>
        
        {/* async callMethod({ contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT }) {
    // Sign a transaction with the "FunctionCall" action
    return await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
  } */}
      </Row>
    </Container>
  );
};

export default NewPoll;

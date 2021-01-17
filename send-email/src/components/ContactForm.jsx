import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import axios from "axios";
const ContactForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  //   declaring new state to store respnse from api
  const [result, setResult] = useState(null);

  // method to send email
  const sendEmail = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/send", { ...state })
      .then((response) => {
        console.log(response);
        setResult(response.data);
        setState({ 
            name: "", 
            email: "", 
            subject: "", 
            message: "" 
        });
      })
      .catch((error) => {
        console.log(error);
        setResult({
          success: false,
          message: "some went wrong, please try later",
        });
      });

    console.log(`we gonna fill this later`);
  };

  const onInPutChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      {result && (
        <p className={`${result.success ? "success" : "error"}`}>
          {result.message}
        </p>
      )}
      <form onSubmit={sendEmail}>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            placeholder="enter full name"
            onChange={onInPutChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={state.email}
            placeholder="enter full email address"
            onChange={onInPutChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={state.subject}
            placeholder="enter subject"
            onChange={onInPutChange}
          />
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={state.message}
            rows="4"
            placeholder="enter full message"
            onChange={onInPutChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;

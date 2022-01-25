import logo from './logo.svg';
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './App.css';

function ActivityForm() {
    const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    fetch('https://webhook.site/b0be424b-46c0-49d1-bc0c-2902e9c7fcdf', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer 123abc456def'
        },
        body: {
            name: 'Roger',
            age: 8
        }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })    
  }

  return (
     <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="Email">
          <Form.Label>Testing</Form.Label>
          <Form.Control
            autoFocus
            type="Email"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="Password">
          <Form.Label>Testing</Form.Label>
          <Form.Control
            type="Password"
            value={Password}
            onChange={(e) => SetPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default ActivityForm;

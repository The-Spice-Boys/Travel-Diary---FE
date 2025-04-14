import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect, use} from "react";
export const UserSettingsPage = () => {
  const emailCheckRegex =/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/
  const [newEmail, setNewEmail]=useState("")
  const [userName, setUserName]=useState("")
  const [privacy, setPrivacy]=useState("")
  const [theme, setTheme]=useState("")
  useEffect(()=>{
    console.log(privacy,"this is the privacy")

  },[privacy])
  const handlePrivacyChange =(event)=>{
    event.preventDefault();

  }
  return (
    <Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="0">
      <Accordion.Header>Privacy</Accordion.Header>
      <Accordion.Body>
      <Form onSubmit={handlePrivacyChange}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Select aria-label="select your privacy preference" onChange = {event=>setPrivacy(event.target.value)}>
      <option value= "None">Select your privacy preference</option>
      <option value="Public">Public</option>
      <option value="Private">Private</option>
    </Form.Select>
        </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Confirm Your Change
      </Button>
     {privacy === "None"? <div>
      <p> Please choose Your Privacy</p>
      </div>:null}
    </Form>

      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header>Change Email Address</Accordion.Header>
      <Accordion.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>New Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange = {event=>setNewEmail(event.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Confirm Your Change
      </Button>
    </Form>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
      <Accordion.Header>Change Username</Accordion.Header>
      <Accordion.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>New Username</Form.Label>
        <Form.Control type="text" placeholder="Username" onChange = {event=>setUserName(event.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Confirm Your Change
      </Button>
    </Form>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
      <Accordion.Header>Change Theme</Accordion.Header>
      <Accordion.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Select aria-label="select your privacy preference" onChange = {event=>setTheme(event.target.value)}>
      <option>Select Your Theme Preference</option>
      <option value="Dark">Dark</option>
      <option value="Light">Light</option>
    </Form.Select> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Confirm Your Change
      </Button>
    </Form>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  );
};

// React
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// Routing
import { Link } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      DOB: dob
    };

    console.log(data);

    fetch("https://depp-flix.onrender.com/users", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
          alert("Sign-up successful! Please log in with your shiny new credentials.");
          window.location.reload();
        } else {
          alert("Sign-up failed.. Sorry :(");
        }
      });
    navigate('/login');
  };

  return (
    <Form onSubmit={handleSubmit} className="txt">
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <br />
        <Form.Control 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
          />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <br />
        <Form.Control 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
      />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <br />
        <Form.Control 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <br />
        <Form.Control 
          type="date" 
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          />
      </Form.Group>
      <br />
      <Button 
        type='submit'
        className='btn btn-outline-light btn pointer me-3'
      >Sign Up</Button>
      <Link to={`/`}>
        <button className='btn btn-outline-light btn pointer'>Back</button>
      </Link>
    </Form>
  );
};
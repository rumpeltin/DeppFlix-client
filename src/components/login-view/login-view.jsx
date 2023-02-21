import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    }

    fetch("https://depp-flix.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
      if (data.user) {  
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user exists.")
      }
    })
    .catch((e) => {
      alert("Something went wrong! Please try again.")
    }) 
  };

  return (
    <Form onSubmit={handleSubmit} className="txt">
      <Form.Group  controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <br />
        <Form.Control 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
          className="txt"
          />
      </Form.Group>
      <br />
      <Form.Group  controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <br />
        <Form.Control 
          type="text" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
      />
      </Form.Group>
      <br />
      <Button type="submit">Log In</Button>
    </Form>
  );
};
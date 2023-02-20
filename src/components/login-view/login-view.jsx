import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <br />
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
          />
      </div>
      <br />
      <div>
        <label>Password:</label>
        <br />
        <input 
          type="text" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
      />
      </div>
      <br />
      <button type="submit">Log In</button>
    </form>
  );
};
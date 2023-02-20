import { useState } from 'react'

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  
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
      <div>
        <label>Email:</label>
        <br />
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </div>
      <br />
      <div>
        <label>Birthday:</label>
        <br />
        <input 
          type="date" 
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          />
      </div>
      <br />
      <button 
        type="submit"
        className="pointer"
      >Sign Up</button>
    </form>
  );
};
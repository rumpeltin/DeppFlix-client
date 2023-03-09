// React
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Routing
import { Navigate, useNavigate } from 'react-router';

export const UserEdit = ({ user, token }) => {
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

        fetch(`https://depp-flix.onrender.com/users/${user.Username}`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.ok) {
            alert("Your changes have been changed successfully. Please log in with your new credentials.");
            window.location.reload();
            localStorage.clear();
            navigate('/login');
            } else {
                alert("Something went wrong.. Sorry! Please try again.");
            }
         });
    };
    
    return (
        <>
            <Row className="txt">
                <h3 className="text-end">Update Your Personal Details</h3>
                <br />
                <Form onSubmit={handleSubmit}>
                  	<Form.Group>
                    	<Form.Label>Username: </Form.Label>
                    	<Form.Control
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            minLength={3}
                            required
                      	/>
                  	</Form.Group>
                    <br />
                  	<Form.Group>
                    	<Form.Label className="txt">Email: </Form.Label>
                    	<Form.Control 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                    	/>
                    </Form.Group>
                    <br />
                  	<Form.Group>
                    	<Form.Label className="txt">Password: </Form.Label>
                    	<Form.Control 
                            type="text" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                  		/>
                  	</Form.Group>
                    <br />
                  	<Form.Group>
                    	<Form.Label className="txt">Date of Birth: </Form.Label>
                    	<Form.Control 
                      		type="date" 
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                    	/>
                    </Form.Group>
                    <br />
                    <Button type="submit" className="btn btn-outline-light btn pointer mb-3">Save Changes</Button>
                </Form>
            </Row>
        </>
    );
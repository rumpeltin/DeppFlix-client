// React
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export const UserDelete = ({ user, token }) => {

	const handleDeregister = () => {
        fetch(REACT_APP_USER_URL, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.ok) {
            alert("Your account has been deleted successfully. Goodbye!");
            localStorage.clear();
            window.location.reload(); 
          } else {
            alert("Something went wrong, we're very sorry. Please try again.");
          }
        });
      };

	return (
		<Row className="txt">
			<Col>
		        <h3 className="danger">DANGER ZONE</h3>
		        <h4>Delete Your Account</h4>
		        <p>
		        	Careful! This cannot be undone.
		        	<br /> 
		        	You will <span className="danger">IMMEDIATELY</span> lose all your personal data, incl. your favourite movies.</p>
		        <Button 
		        	onClick={() => handleDeregister(user._id)} 
		        	className="btn btn-outline-light btn pointer mb-3" 
		        	type="submit" 
		        	variant="danger">
		        	Delete My Account
		        </Button>
		    </Col>
	    </Row>
	);
};
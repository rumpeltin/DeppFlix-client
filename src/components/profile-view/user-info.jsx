// React
import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Routing
import { Link } from 'react-router-dom'

export const UserInfo = ({user, token}) => {
	const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    useEffect(() => {

    fetch("https://depp-flix.onrender.com/users/:{$Username}", {
      method: "GET",
      headers: { 
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userFromApi = data.map((user) => {
          return {
          	id: user._id,
          	username: user.Username,
          	email: user.Email,
          	password: user.Password,
          	dob: user.DOB
          }
        });

      setUser(userFromApi);

      });
  }, []);

	return (
		<Row>
			<Col>
				<span className="txt">Username: </span>
				<span className="txt">{user.username}</span>
			</Col>
			<Col>
				<span className="txt">E-Mail: </span>
				<span className="txt">{user.email}</span>
			</Col>
			<Col>
				<span className="txt">Date of Birth: </span>
				<span className="txt">{user.dob}</span>
			</Col>
			<Col>
				<Link to={`/`}>
	        		<button className='btn btn-outline-light btn pointer'>Back</button>
	      		</Link>
	      	</Col>
		</Row>
	);
};
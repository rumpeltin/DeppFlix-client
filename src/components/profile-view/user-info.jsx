// React
import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Routing
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

export const UserInfo = ({ user }) => {
	

	return (
		<Row className="d-flex flex-column">
			<Col className="my-2">
				<span className="txt">Username</span><br />
				<span className="txt">{user.Username}</span>
				
			</Col>
			<Col className="my-2">
				<span className="txt">Personal ID</span><br />
				<span className="txt">{user._id}</span>
			</Col>
			<Col className="my-2">
				<span className="txt">E-Mail</span><br />
				<span className="txt">{user.Email}</span>
			</Col>
			<Col className="my-2">
				<span className="txt">Date of Birth</span><br />
				<span className="txt">{user.DOB}</span>
			</Col>
			<Col className="my-2">
				<Link to={`/`}>
	        		<button className='btn btn-outline-light btn pointer'>Back</button>
	      		</Link>
	      	</Col>
		</Row>
	);
};
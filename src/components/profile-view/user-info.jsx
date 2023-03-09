// React
import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


export const UserInfo = ({ user }) => {
	
	return (
		<>
			<Row className="d-flex direction-column my-4 txt">
				<h3 className="text-end"> Your Profile</h3>
				<Col className="my-2">
					<span>Username</span><br />
					<span>{user.Username}</span>
					
				</Col>
				<Col className="my-2">
					<span>Personal ID</span><br />
					<span>{user._id}</span>
				</Col>
				<Col className="my-2">
					<span>E-Mail</span><br />
					<span>{user.Email}</span>
				</Col>
				<Col className="my-2">
					<span>Date of Birth</span><br />
					<span>{user.DOB}</span>
				</Col>
			</Row>
		</>
	);
};
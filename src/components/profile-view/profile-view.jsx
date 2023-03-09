// React
import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Custom Components
import { UserInfo } from './user-info'
import { UserMovies } from './user-movies'
import { UserEdit } from './user-edit'
import { UserDelete } from './user-delete'

// Routing
import { Link } from 'react-router-dom'

export const ProfileView = ({ user, movies }) => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
  	const storedToken = localStorage.getItem("token");

	return (
		<>
			<Row>
				<UserInfo user={storedUser} />
				<Col className="d-flex justify-content-center">
					<hr className="hr w-25 my-5"/>
				</Col>
				<UserMovies
					user={storedUser}
					movies={movies}
				/>
				<Col className="d-flex justify-content-center">
					<hr className="hr w-25 my-5"/>
				</Col>
				<UserEdit 
					user={storedUser}
					token={storedToken}
				/>
				<hr className="hr my-5"/>
				<UserDelete 
					user={storedUser}
					token={storedToken} 
				/>
			</Row>
			<Row>
				<Col className="mb-5">
					<Link to={`/`}>
		        		<button className='btn btn-outline-light btn pointer'>Back</button>
		      		</Link>
		      	</Col>
			</Row>
		</>
	);
};
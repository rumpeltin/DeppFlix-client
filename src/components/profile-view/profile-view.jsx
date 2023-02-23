// React
import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Custom Components
import { UserInfo } from './user-info'

export const ProfileView = ({user, token}) => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");

	return (
		<UserInfo user={storedUser} />
	);
};
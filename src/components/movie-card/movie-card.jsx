import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap'

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}> 	
      <Card className="h-100 txt">
    	 <Card.Body className="bg">
    	   <Card.Title>{movie.title}</Card.Title>
         <Card.Text>{movie.genre} by {movie.director}</Card.Text>
    	   <Card.Text>{movie.description}</Card.Text>
    	 </Card.Body>
    	</Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string,
    genre: PropTypes.string
  }),
};
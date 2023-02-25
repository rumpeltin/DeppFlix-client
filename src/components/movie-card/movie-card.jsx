import React from 'react'
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
	<Card onClick={() => onMovieClick(movie)} className="h-100 txt">
	 <Card.Body className="bg">
	   <Card.Title>{movie.title}</Card.Title>
       <Card.Text>{movie.genre} by {movie.director}</Card.Text>
	   <Card.Text>{movie.description}</Card.Text>
	 </Card.Body>
	</Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birth: PropTypes.string,
    }),
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired,
  }),
  onMovieClick: PropTypes.func.isRequired
};
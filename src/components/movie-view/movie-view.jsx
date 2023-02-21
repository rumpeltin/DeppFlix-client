import React from 'react'
import { Link } from "react-router-dom";

import './movie-view.scss'

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <>
      <h2>Overview</h2>
      <div className="movie-title">
        <span className="title">Title: </span>
        <span className="value">{movie.title}</span>
      </div>
      <div className="movie-description">
        <span className="description">Description: </span>
        <span className="value">{movie.description}</span>
      </div>
      <br />
      <div className="movie-director">
        <span className="director">Director: </span>
        <span className="value">{movie.director}</span>
      </div>
      <div className="director-bio">
        <span className="bio">Biography: </span>
        <span className="value">{movie.directorBio}</span>
      </div>
      <div className="director-birth">
        <span className="birth">Year of Birth: </span>
        <span className="value">{movie.directorBirth}</span>
      </div>
      <br/>
      <div className="movie-genre">
        <span className="genre">Genre: </span>
        <span className="value">{movie.genre}</span>
      </div>
      <div className="genre-description">
        <span className="description">Descripion: </span>
        <span className="value">{movie.genreDescription}</span>
      </div>
      <br/>
      <Link to={`/`}>
        <button 
          className='btn btn-outline-light pointer' 
          >Back</button>
      </Link>
    </>
  );
};
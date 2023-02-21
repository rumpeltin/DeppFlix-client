import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

import './movie-view.scss'

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <>
      <h2 className="page-title txt">Overview</h2>
      <div className="movie-title txt">
        <span className="title">Title: </span>
        <span className="value">{movie.title}</span>
      </div>
      <div className="movie-description txt">
        <span className="description">Description: </span>
        <span className="value">{movie.description}</span>
      </div>
      <br />
      <div className="movie-director txt">
        <span className="director">Director: </span>
        <span className="value">{movie.director}</span>
      </div>
      <div className="director-bio txt">
        <span className="bio">Biography: </span>
        <span className="value">{movie.directorBio}</span>
      </div>
      <div className="director-birth txt">
        <span className="birth">Year of Birth: </span>
        <span className="value">{movie.directorBirth}</span>
      </div>
      <br/>
      <div className="movie-genre txt">
        <span className="genre">Genre: </span>
        <span className="value">{movie.genre}</span>
      </div>
      <div className="genre-description txt">
        <span className="description">Descripion: </span>
        <span className="value">{movie.genreDescription}</span>
      </div>
      <br/>
      <Link to={`/`}>
        <button className='btn btn-outline-light btn pointer'>Back</button>
      </Link>
    </>
  );
};
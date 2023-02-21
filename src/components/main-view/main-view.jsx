import React, { useState, useEffect } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// App Components
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup-view/signup-view'
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [user, setUser] = useState(storedUser? storedUser : null)
  const [token, setToken] = useState(storedToken? storedToken : null)

  useEffect(() => {

    fetch("https://depp-flix.onrender.com/movies", {
      headers: { 
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
              id: movie._id,
              title: movie.Title,
              description: movie.Description,
              director: movie.Director.Name,
              directorBio: movie.Director.Bio,
              directorBirth: movie.Director.Birth,
              genre: movie.Genre.Name,
              genreDescription: movie.Genre.Description
          }
        });

        setMovies(moviesFromApi);

      });
  }, [token]);

  return (
    <Row  className="justify-content-md-center txt">
      { !user ? (
        <Row className="justify-content-between align-items-center">
          <Col md={5}>
            <h2 className="text-end">Login</h2>
            <LoginView
              className="align-self-start"
              onLoggedIn={(user, token) => {
                setUser(user)
                setToken(token);
              }}
            />
          </Col>
          <Col md={5}>
            <h2 className="text-end">New here?</h2>
            <SignupView/>
          </Col>
        </Row>
      ): selectedMovie ? (
        <Col md={8}>
          <MovieView 
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ): movies.length === 0 ? (
        <div>Apologies, this list is emtpy.</div>
      ): (
        <>
          {movies.map((movie) => (
            <Col key={movie.id} className="mb-5 txt" md={3}>
              <MovieCard  
                key={movie.id} 
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <br />
          <Col md={2}>
            <button 
              className='btn btn-outline-light btn-lg pointer'
              onClick={
                ()=>{
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }
              }
            >Logout</button>
          </Col>
        </>
      )}
    </Row>
  );
}
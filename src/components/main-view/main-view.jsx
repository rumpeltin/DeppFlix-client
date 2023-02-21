import React, { useState, useEffect } from 'react'

// Design
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Routing
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Custom Components
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup-view/signup-view'
import { MovieView } from '../movie-view/movie-view'
import { MovieCard } from '../movie-card/movie-card'

export const MainView = () => {
  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([])
  // const [selectedMovie, setSelectedMovie] = useState(null)
  const [user, setUser] = useState(null)
  // const [token, setToken] = useState(storedToken? storedToken : null)

  useEffect(() => {

    fetch("https://depp-flix.onrender.com/movies", {
      headers: { 
        Accept: 'application/json',
        // Authorization: `Bearer ${token}`,
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
  }, []);

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
            <Route 
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ): (
                    <Col md={5}>
                      <h2 className="text-end txt">New here?</h2>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={ 
                <>
                  {user ? (
                    <Navigate to="/" />
                  ): (
                    <Col md={5}>
                      <h2 className="text-end txt">Login</h2>
                      <LoginView
                        className="align-self-start"
                        onLoggedIn={(user) => setUser(user)}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  { !user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>Apologies, this list is emtpy.</Col>
                  ): (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>Apologies, this list is emtpy.</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                      <Col md={8}>
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
                </>
              }
            />
          </Routes>
        </Row>
    </BrowserRouter>
  );
};
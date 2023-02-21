// React
import React, { useState, useEffect } from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Custom Components
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup-view/signup-view'
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"

// Routing
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([])
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
    <BrowserRouter>
      <Row>
        <Routes>
            <Route 
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ): (
                    <Col 
                      md={5}
                      style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
                    >
                      <h2 className="text-end txt">Glad to have you here!</h2>
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
                    <Row 
                      className="justify-content-around" 
                      style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
                    >
                      <Col md={3} className="align-self-center">
                        <h2 className="text-end txt">Login</h2>
                        <LoginView
                          className="align-self-start"
                          onLoggedIn={(user, token) => {
                            setUser(user)
                            setToken(token);
                          }}
                        />
                      </Col>
                      <Col md={4}>
                        <h2 className="text-end txt">New here?</h2>
                        <p className="text-end txt">
                          If you're looking for information on Johnny Depp and his movies, you've come to the right place. 
                          Join us now!
                        </p>
                        <Link to={`/signup`}>
                          <button className='btn btn-outline-light btn pointer m-2' style={{float:"right"}}>Sign Up</button>
                        </Link>
                      </Col>
                    </Row>
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
                    <Col className="txt">Apologies, this list is emtpy.</Col>
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
import React, { useState, useEffect } from 'react'
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

    if (!token) {
      return;
    }

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

  if (!user) {
    return (
      <>  
        <LoginView 
          onLoggedIn={(user, token) => {
            setUser(user)
            setToken(token);
          }}
        /> 
        <br />
        <hr />
        <h2 className='depp-flix'>New here?</h2>
        <SignupView />
      </>
    );
  }

  if (movies.length === 0) {
    return <div>Apologies, this list is emtpy.</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView 
        movie={selectedMovie} 
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <>
      <div>
        {movies.map((movie) => (
          <MovieCard  
            key={movie.id} 
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
      <br />
      <button 
        onClick={
          ()=>{
            setUser(null);
            setToken(null);
            localStorage.clear();
          }
        }
      >Logout</button>
    </>
  );
}
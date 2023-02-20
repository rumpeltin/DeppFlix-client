import React, { useState, useEffect } from 'react'
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"

export const MainView = () => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    fetch("https://depp-flix.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

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
    </>
  );
}
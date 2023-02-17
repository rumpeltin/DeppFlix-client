import React, { useState } from 'react'
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1, 
      title: "Inception",
      image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
      director: "Christopher Nolan",
      genre: "Sci-Fi Action"
   },
    {
      id: 2, 
      title: "The Shawshank Redemption", 
      image: "https://images-na.ssl-images-amazon.com/images/I/51WAikRq37L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
      director: "Frank Darabont",
      genre: "Drama"
    },
    {
      id: 3,
      title: "Gladiator",
      image: "https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg",
      director: "Ridley Scott",
      genre: "Historical Drama"
    }
  ])
  const [selectedMovie, setSelectedMovie] = useState(null)

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
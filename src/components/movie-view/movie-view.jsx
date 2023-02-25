// React
import React from 'react'
import { useState } from "react";

// Design
import Button from 'react-bootstrap/Button'

// Routing
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

export const MovieView = ({ movies, user, token }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [favouriteMovies, setFavouriteMovies] = useState(storedUser.FavouriteMovies ? storedUser.FavouriteMovies: favouriteMovies);
    const movieFavourited = favouriteMovies.some((m) => m === movieId)

    const changeIcon = (event) => {
        event.preventDefault();
        toggleFavourite(movie);
    }

    // Toggle adding/removing of favourite movie
    const toggleFavourite = (movie) => {
        const movieFavourited = favouriteMovies.some((m) => m === movieId)
        if (movieFavourited) {
            deleteFavouriteMovie(movie);
            setFavouriteMovies(
                favouriteMovies.filter((favouriteMovie) => favouriteMovie.id !== movie.id)
            );
        } else {
            addFavouriteMovie(movie);
            setFavouriteMovies([...favouriteMovies, movie]);
        }
    };

    // ADD favourite movie
    const addFavouriteMovie = async() => {
        const favouriteMovie = await fetch(`https://depp-flix.onrender.com/users/${user.Username}/movies/${movie.id}`, {
            method: "POST",
            headers: { 
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", 
            }
        })

        const response = await favouriteMovie.json()
        setFavouriteMovies(response.FavouriteMovies)
        if (response) {
            alert(`${movie.title} has been added to your favourites.`);
            localStorage.setItem("user", JSON.stringify (response))
            window.location.reload(); 
        } else {
            alert("Something broke! We're really sorry. Please try again.");
        }    
    }

    // REMOVE favourite movie
    const deleteFavouriteMovie = async() => {
        const favouriteMovie = await fetch (`https://depp-flix.onrender.com/users/${user.Username}/movies/${movie.id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })     
    
        const response = await favouriteMovie.json()
        console.log(response)
        if (response) {
            alert(`${movie.title} has been removed from your favourites.`);
            localStorage.setItem("user", JSON.stringify (response))
            window.location.reload(); 
        } else {
            alert("Something broke! We're really sorry. Please try again.");
        }
    };

    return (
        <>
            <h2 className="page-title text-end txt">Movie Overview</h2>
            <div className="movie-title txt">
                    <Button
                        variant="link"
                        className="text-light"
                        onClick={changeIcon}
                    >
                    {movieFavourited ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-heart-fill"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-heart"
                            viewBox="0 0 16 16"
                            color="primary"
                        >
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                    )}
                </Button>
                <span className="value">{movie.title}</span>
            </div>
            <div className="movie-description txt">
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
                <br/>
                <span className="value">{movie.genreDescription}</span>
            </div>
            <br/>
            <Link to={`/`}>
                <button className='btn btn-outline-light btn pointer'>Back</button>
            </Link>
        </>
    );
};
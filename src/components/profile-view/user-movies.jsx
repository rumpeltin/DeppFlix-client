import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const UserMovies = ({ movies, user }) => {

    let favouriteMovies = movies.filter((m) => user.FavouriteMovies.includes(m.id));
    console.log(favouriteMovies);

    return (
        <>
            {favouriteMovies.length === 0 ? (
                <p>You haven't liked any movies yet!</p>
            ) : (
                <>
                    <Row className="txt my-2">
                        <h3 className="text-end">Your Favourite Movies</h3>
                        {favouriteMovies.map((movie) => (
                            <Col 
                                className='my-2' 
                                key={movie.id}>
                                <MovieCard
                                    movie={movie}
                                    user={user}
                                />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};
import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div 
    onClick={() => {
      onMovieClick(movie)
    }}
    >{movie.title}</div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birth: PropTypes.string,
    }),
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired,
  }),
  onMovieClick: PropTypes.func.isRequired
};
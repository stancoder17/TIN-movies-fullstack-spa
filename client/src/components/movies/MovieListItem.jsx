import {Link} from "react-router-dom";
import { formatRatingScore } from '../../utils/formatUtils.js';
import ratingConstraints from '../../../../utils/constraints/ratingConstraints.js';

function MovieListItem({ movie }) {
    const releaseYear = new Date(movie.release_date).getFullYear();
    const averageScore = formatRatingScore(movie.averageScore)

    return (
        <Link className="media-block" to={`/movies/${movie.id}`}>
            <img className="media-poster" src={movie.poster_url || "../images/posters/default.jpg"} alt={`${movie.title} poster`}/>

            <div className="media-summary">
                <h1 className="text-main">{movie.title}</h1>
                <h3 className="text-main text-main-dark">({releaseYear})</h3>
                <h3 className="text-main"><span className='text-main-dark'>Director:</span> {movie.director}</h3>
                <p className="text-accent">{movie.description}</p>
            </div>

            <div className="media-rating">
                <h1>
                    <span className="rating-stars">★</span>
                    <span className="rating-score">{averageScore}</span>
                    <span className="rating-scale">/{ratingConstraints.score.max}</span>
                </h1>
                <h2 className="text-main">{movie.count || 0} rating(s)</h2>
            </div>
        </Link>
    );
}

export default MovieListItem;

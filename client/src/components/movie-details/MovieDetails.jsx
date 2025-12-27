import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import './MovieDetails.css';
import RatingsList from "./RatingsList.jsx";
import ratingConstraints from '../../../../utils/constraints/ratingConstraints.js';
import {formatDate} from "../../utils/formatUtils.js";

function MovieDetails() {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [ratings, setRatings] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/api/movies/" + id)
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(error => console.error(`Error fetching movie details for ID ${id}:`, error));

        fetch(`http://localhost:5000/api/movies/${id}/ratings`)
            .then(response => response.json())
            .then(data => setRatings(data))
            .catch(error => console.error(`Error fetching ratings for movie ID ${id}:`, error));
    }, [id]);

    const handleMovieDelete = async () => {
        const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            navigate('/movies');
        } else {
            const error = await response.json();
            console.error('Error deleting movie:', error.message);
        }
    }

    // Double-fetching is needed because we need an updated value of average score that is based on the updated ratings list.
    const handleRatingSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const ratingData = {
            user_id: 3, // TODO: Get from auth context
            movie_id: parseInt(id),
            score: parseFloat(formData.get('rating-score')),
            comment: formData.get('comment')
        };

        try {
            const response = await fetch('http://localhost:5000/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ratingData)
            });

            if (response.ok) { // GET updated ratings list
                await fetch(`http://localhost:5000/api/movies/${id}/ratings`)
                    .then(res => res.json())
                    .then(data => setRatings(data))
                    .catch(error => console.error(`Error fetching ratings for movie ID ${id}:`, error));

                // Clear form
                e.target.reset();
            } else {
                const error = await response.json();
                console.error('Error creating rating:', error.message);
            }
        } catch (error) {
            console.error('Error adding rating:', error);
        }
    }

    const handleRatingUpdate = async (ratingId, updatedRatingData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ratings/${ratingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRatingData)
            });

            if (response.ok) { // GET updated ratings list
                await fetch("http://localhost:5000/api/movies/" + id + "/ratings")
                    .then(res => res.json())
                    .then(data => setRatings(data))
                    .catch(error => console.error(`Error fetching ratings for movie ID ${id}:`, error));
            }
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };

    const handleRatingDelete = async (ratingId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ratings/${ratingId}`, {
                method: 'DELETE'
            });

            if (response.ok) { // GET updated ratings list
                await fetch("http://localhost:5000/api/movies/" + id + "/ratings")
                    .then(res => res.json())
                    .then(data => setRatings(data))
                    .catch(error => console.error(`Error fetching ratings for movie ID ${id}:`, error));
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    };

    return (
        <div className="main-content">
            {movie && (
                <>
                    <div className="details-header">
                        <div className="title-and-details">
                            <h1 className="text-main">{movie.title}</h1>
                            <h4 className="text-accent">
                                <span>• {movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)}</span>
                                <span>• Release date: {formatDate(movie.release_date)} </span>
                            </h4>
                        </div>

                        <div className="actions-and-media-rating">
                            <div className="action-buttons">
                                <Link to={`/movies/${id}/edit`}>
                                    <button className="btn-blue" type="button">Edit</button>
                                </Link>
                                <button className="btn-red" type="button" onClick={handleMovieDelete}>Delete</button>
                            </div>
                            {ratings.averageScore && (
                                <div className="media-rating">
                                    <h1>
                                        <span className="rating-stars">★</span>
                                        <span className="rating-score">{ratings.averageScore}</span>
                                        <span className="rating-scale">/{ratingConstraints.score.max}</span>
                                    </h1>
                                    <h2 className="text-main">{ratings.ratingsList.length} rating(s)</h2>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="poster-and-video">
                        <img className="media-poster media-poster-big" src={movie.poster_url} alt="Andor poster"/>
                        <iframe className="media-poster media-trailer" src={movie.youtube_html_url}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen></iframe>
                    </div>

                    <div className="details-footer">
                        <p className="text-accent">{movie.description}.</p>
                        <h3 className="text-main"><strong>Director: </strong>{movie.director}</h3>
                    </div>

                    <hr className="separator"/>

                    <RatingsList ratings={ratings} handleDelete={handleRatingDelete} handleUpdate={handleRatingUpdate} />

                    <div className="form-container">
                        <form onSubmit={handleRatingSubmit}>
                            <textarea id="comment" name="comment" placeholder="Write a comment..."></textarea>
                            <div className="media-rating">
                                <h1>
                                    <span className="rating-stars">★</span>
                                    <label htmlFor="rating-score"></label>
                                    <input type="number" id="rating-score" name="rating-score" min={ratingConstraints.score.min} max={ratingConstraints.score.max} step={ratingConstraints.score.increment}/>
                                    <span className="rating-scale">/{ratingConstraints.score.max}</span>
                                </h1>
                            </div>
                            <button type="submit">Post</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default MovieDetails;
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import styles from './MovieDetails.module.css';
import ratingStyles from '../RatingUpdate.module.css'
import RatingsList from "../common/RatingsList.jsx";
import RatingListItem from "../common/RatingListItem.jsx";
import ratingConstraints from '../../../../utils/constraints/ratingConstraints.js';
import {formatDate, formatRatingScore} from "../../utils/formatUtils.js";
import {calculateAverageScore} from "../../../../utils/utils.js";

function MovieDetails() {
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [hasRating, setHasRating] = useState(false);
    const [averageScore, setAverageScore] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/api/movies/" + id)
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(error => console.error(`Error fetching movie details for ID ${id}:`, error));

        fetch(`http://localhost:5000/api/movies/${id}/ratings`)
            .then(response => response.json())
            .then(data => {
                setRatings(data);
                setAverageScore(formatRatingScore(calculateAverageScore(data)));

                if (data.some(rating => rating.user_id === 1)) { // TODO: Get user ID from auth context
                    setHasRating(true);
                }
            })
            .catch(error => console.error(`Error fetching ratings for movie ID ${id}:`, error));
    }, [id]);

    const handleMovieDelete = async () => {
        const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            navigate('/movies');
        }
    }

    // Double-fetching is needed because we need an updated value of average score that is based on the updated ratings list.
    const handleRatingSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const ratingData = {
            user_id: 1, // TODO: Get from auth context
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

            if (response.ok) {
                await fetch(`http://localhost:5000/api/movies/${id}/ratings`)
                    .then(res => res.json())
                    .then(data => {
                        setRatings(data);
                        setAverageScore(formatRatingScore(calculateAverageScore(data)));
                    })
                    .catch(error => console.error(`Error fetching ratings for movie ID ${id}:`, error));

                // Clear form
                e.target.reset();
            } else {
                const error = await response.json();
                alert(error.message);
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

            if (response.ok) {
                const newRatingsList = ratings.map(r => r.id === ratingId ? {...r, ...updatedRatingData} : r);
                setRatings(newRatingsList);
                setAverageScore(formatRatingScore(calculateAverageScore(newRatingsList)));
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

            if (response.ok) {
                const newRatingsList = ratings.filter(r => r.id !== ratingId);
                setRatings(newRatingsList);
                setAverageScore(formatRatingScore(calculateAverageScore(newRatingsList)));
                setHasRating(false);
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    };

    return (
        <div className={styles.movieDetailsPageWrapper}>
            <div className={`main-content ${styles.mainContent || ''}`.trim()}>
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
                            <div className={`action-buttons ${styles.actionButtons || ''}`.trim()}>
                                <Link to={`/movies/${id}/edit`}>
                                    <button className="btn-blue" type="button">Edit</button>
                                </Link>
                                <button className="btn-red" type="button" onClick={handleMovieDelete}>Delete</button>
                            </div>
                            {averageScore && (
                                <div className={`media-rating ${styles.mediaRating || ''}`.trim()}>
                                    <h1>
                                        <span className={`rating-stars ${styles.ratingStars || ''}`.trim()}>★</span>
                                        <span className={`rating-score ${styles.ratingScore || ''}`.trim()}>{averageScore}</span>
                                        <span className={`rating-scale ${styles.ratingScale || ''}`.trim()}>/{ratingConstraints.score.max}</span>
                                    </h1>
                                    <h2 className="text-main">{ratings.length} rating(s)</h2>
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

                    <RatingsList ratings={ratings} handleDelete={handleRatingDelete} handleUpdate={handleRatingUpdate} ItemComponent={RatingListItem} />

                    {!hasRating && (
                        <div className={`form-container ${styles.formContainer || ''}`.trim()}>
                            <form className={`${styles.movieDetailsForm} ${ratingStyles.movieDetailsForm}`} onSubmit={handleRatingSubmit}>
                                <textarea id="comment" name="comment" placeholder="Write a comment..." maxLength={ratingConstraints.comment.maxLength}></textarea>
                                <h2 className='text-main'>Rate:</h2>
                                <div className={`media-rating ${styles.mediaRating || ''}`.trim()}>
                                    <h1>
                                        <span className={`rating-stars ${styles.ratingStars || ''}`.trim()}>★</span>
                                        <label htmlFor="rating-score"></label>
                                        <input type="number" id="rating-score" name="rating-score" min={ratingConstraints.score.min} max={ratingConstraints.score.max} step={ratingConstraints.score.increment}/>
                                        <span className={`rating-scale ${styles.ratingScale || ''}`.trim()}>/{ratingConstraints.score.max}</span>
                                    </h1>
                                </div>
                                <button type="submit">Post</button>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
        </div>
    )
}

export default MovieDetails;
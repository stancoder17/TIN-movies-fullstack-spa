import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import './MovieDetails.css';
import RatingsList from "./RatingsList.jsx";
import ratingConstraints from '../../../../utils/constraints/ratingConstraints.js';

function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const [ratings, setRatings] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/api/movies/" + id)
            .then(response => response.json())
            .then(data => setMovie(data))
            .catch(error => console.error(`Error fetching movie details for ID ${id}:`, error));

        fetch("http://localhost:5000/api/movies/" + id + "/ratings")
            .then(response => response.json())
            .then(data => setRatings(data))
            .catch(error => console.error(`Error fetching ratings for movie ID ${id}:`, error));
    }, [id]);

    return (
        <div className="main-content">
            {movie && (
                <>
                    <div className="details-header">
                        <div className="title-and-details">
                            <h1 className="text-main">{movie.title}</h1>
                            <h4 className="text-accent">
                                <span>• {movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)}</span>
                                <span>• Release date: {movie.release_date} </span>
                            </h4>
                        </div>

                        <div className="actions-and-media-rating">
                            <div className="action-buttons">
                                <Link to={`/movies/${id}/edit`}>
                                    <button className="btn-blue" type="button">Edit</button>
                                </Link>
                                <Link to={`/movies/${id}/delete`}>
                                    <button className="btn-red" type="button">Delete</button>
                                </Link>
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

                    <RatingsList ratings={ratings} />

                    <div className="form-container">
                        <form>
                            <textarea id="comment" name="comment" placeholder="Write a comment..."></textarea>

                            <div className="rating-radio-group">
                                <h3 className="text-main">Rate:</h3>

                                <div className="rating-scale-container">
                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-1" name="media-rating" value="1"/>
                                        <label htmlFor="rate-1" className="text-main">1</label>
                                    </div>

                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-2" name="media-rating" value="2"/>
                                        <label htmlFor="rate-2" className="text-main">2</label>
                                    </div>

                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-3" name="media-rating" value="3"/>
                                        <label htmlFor="rate-3" className="text-main">3</label>
                                    </div>

                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-4" name="media-rating" value="4"/>
                                        <label htmlFor="rate-4" className="text-main">4</label>
                                    </div>

                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-5" name="media-rating" value="5"/>
                                        <label htmlFor="rate-5" className="text-main">5</label>
                                    </div>

                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-6" name="media-rating" value="6"/>
                                        <label htmlFor="rate-6" className="text-main">6</label>
                                    </div>

                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-7" name="media-rating" value="7"/>
                                        <label htmlFor="rate-7" className="text-main">7</label>
                                    </div>

                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-8" name="media-rating" value="8"/>
                                        <label htmlFor="rate-8" className="text-main">8</label>
                                    </div>

                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-9" name="media-rating" value="9"/>
                                        <label htmlFor="rate-9" className="text-main">9</label>
                                    </div>

                                    <div className="radio-item-vertical">
                                        <input type="radio" id="rate-10" name="media-rating" value="10"/>
                                        <label htmlFor="rate-10" className="text-main">10</label>
                                    </div>
                                </div>
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
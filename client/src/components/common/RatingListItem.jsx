import {Link} from "react-router-dom";
import {useState} from "react";
import '../movie-details/Movie_RatingUpdate.css';
import '../RatingUpdate.css';
import ratingConstraints from "../../../../utils/constraints/ratingConstraints.js";
import {formatDate} from "../../utils/formatUtils.js";

// Universal component for viewing and editing ratings (both for movie details and user profile)
function RatingListItem({ rating, handleDelete, handleUpdate }) {
    const [beingEdited, setBeingEdited] = useState(false);

    // Determine if this is a movie rating (has user info) or user rating (has movie info)
    const isMovieRating = rating.nickname !== undefined;
    const isUserRating = rating.title !== undefined;

    const onEditClick = () => {
        setBeingEdited(true);
    }

    const onCancelClick = () => {
        setBeingEdited(false);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedRating = {
            score: parseFloat(formData.get('rating-score').toString()),
            comment: formData.get('comment'),
            edited: true
        };

        await handleUpdate(rating.id, updatedRating);
        setBeingEdited(false);
    };

    const onDeleteClick = async () => {
        handleDelete(rating.id);
    };

    const FormOrDiv = beingEdited ? 'form' : 'div';

    return (
        <div>
            <FormOrDiv className="comment" onSubmit={beingEdited ? onSubmit : undefined}>
                <div className="comment-header">
                    <div className="production-info">
                        {isMovieRating && (
                            <>
                                <Link to={`/users/${rating.user_id}`}>
                                    <img className="user-avatar" src={rating.profile_picture_url} alt="User avatar"/>
                                </Link>
                                <Link to={`/users/${rating.user_id}`}>
                                    <h3 className="text-main">{rating.nickname}</h3>
                                </Link>
                            </>
                        )}
                        {isUserRating && (
                            <>
                                <Link to={`/movies/${rating.movie_id}`}>
                                    <img className="media-poster" src={rating.poster_url} alt={`${rating.title} poster`}/>
                                </Link>
                                <Link to={`/movies/${rating.movie_id}`}>
                                    <h3 className="text-main">{rating.title}</h3>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="media-rating">
                        <h1>
                            <span className="rating-stars">★</span>
                            {beingEdited ? (
                                <>
                                    <label htmlFor="rating-score"></label>
                                    <input type="number" id="rating-score" name="rating-score" defaultValue={rating.score} min={ratingConstraints.score.min} max={ratingConstraints.score.max} step={ratingConstraints.score.increment}/>
                                </>
                            ) : (
                                <span className="rating-score">{rating.score}</span>
                            )}
                            <span className="rating-scale">/{ratingConstraints.score.max}</span>
                        </h1>
                    </div>

                    <div>
                        <h4 className="date">{formatDate(rating.created_at)}</h4>
                        {rating.edited && <h4 className="text-main">(edited)</h4> }
                    </div>
                </div>

                {beingEdited ? (
                    <>
                        <div className="comment-body">
                            <label htmlFor="comment"></label>
                            <textarea id="comment" name="comment" placeholder="Comment" defaultValue={rating.comment}></textarea>
                        </div>

                        <div className="comment-actions">
                            <button className="btn-blue" type="submit">Save</button>
                            <button className="btn-red" type="button"
                                    onClick={onCancelClick}>Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {rating.comment ? (
                            <div className="comment-body">
                                <p className="text-accent">{rating.comment}</p>
                            </div>
                        ) : (<p className="text-accent"><em>*no comment provided*</em></p>)}

                        <div className="action-buttons">
                            <button className="btn-blue" type="button" onClick={onEditClick}>Edit</button>
                            <button className="btn-red" type="button" onClick={onDeleteClick}>Delete</button>
                        </div>
                    </>
                )}
            </FormOrDiv>

            <hr className="separator"/>
        </div>
    );
}

export default RatingListItem;


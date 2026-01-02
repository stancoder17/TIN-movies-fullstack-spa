import {Link} from "react-router-dom";
import {useState} from "react";
import movieRatingStyles from '../movie-details/Movie_RatingUpdate.module.css';
import ratingStyles from '../RatingUpdate.module.css';
import movieDetailsStyles from '../movie-details/MovieDetails.module.css';
import userDetailsStyles from '../user-details/UserDetails.module.css';
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
            <FormOrDiv className={`comment ${ratingStyles.comment} ${movieRatingStyles.comment} ${beingEdited ? ratingStyles.ratingUpdateForm : ''}`.trim()} onSubmit={beingEdited ? onSubmit : undefined}>
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
                                    <img className={`media-poster ${userDetailsStyles.mediaPoster || ''}`.trim()} src={rating.poster_url} alt={`${rating.title} poster`}/>
                                </Link>
                                <Link to={`/movies/${rating.movie_id}`}>
                                    <h3 className="text-main">{rating.title}</h3>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className={`media-rating ${movieDetailsStyles.mediaRating || ''} ${ratingStyles.mediaRating}`.trim()}>
                        <h1>
                            <span className={`rating-stars ${movieDetailsStyles.ratingStars || ''}`.trim()}>★</span>
                            {beingEdited ? (
                                <>
                                    <label htmlFor="rating-score"></label>
                                    <input type="number" id="rating-score" name="rating-score" defaultValue={rating.score} min={ratingConstraints.score.min} max={ratingConstraints.score.max} step={ratingConstraints.score.increment}/>
                                </>
                            ) : (
                                <span className={`rating-score ${movieDetailsStyles.ratingScore || ''}`.trim()}>{rating.score}</span>
                            )}
                            <span className={`rating-scale ${movieDetailsStyles.ratingScale || ''}`.trim()}>/{ratingConstraints.score.max}</span>
                        </h1>
                    </div>

                    <div>
                        <h4 className="date">{formatDate(rating.created_at)}</h4>
                        {rating.edited === true && <h4 className="text-main">(edited)</h4> }
                    </div>
                </div>

                {beingEdited ? (
                    <>
                        <div className={`comment-body ${ratingStyles.commentBody || ''}`.trim()}>
                            <label htmlFor="comment"></label>
                            <textarea id="comment" name="comment" placeholder="Comment" defaultValue={rating.comment} maxLength={ratingConstraints.comment.maxLength}></textarea>
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
                    <div className={`comment-body ${ratingStyles.commentBody || ''}`.trim()}>
                    {rating.comment ? (
                            <p className="text-accent">{rating.comment}</p>
                    ) : (
                            <p className="text-accent"><em>*no comment provided*</em></p>
                    )}
                    </div>

                        <div className={`action-buttons ${movieDetailsStyles.commentActionButtons || ''}`.trim()}>
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


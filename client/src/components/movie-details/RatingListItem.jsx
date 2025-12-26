import {Link} from "react-router-dom";
import {useState} from "react";
import './Movie_RatingUpdate.css';
import '../RatingUpdate.css';
import ratingConstraints from "../../../../utils/constraints/ratingConstraints.js";

// This component is both for viewing and editing a rating
function RatingListItem({ rating, handleDelete, handleUpdate }) {
    const [beingEdited, setBeingEdited] = useState(false);

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


    // <form> or <div> depending on whether beingEdited is true or false.
    const FormOrDiv = beingEdited ? 'form' : 'div';

    return (
        <div>
            {// Pass 'onSubmit' function if beingEdited = true
            }
            <FormOrDiv className="comment" onSubmit={beingEdited ? onSubmit : undefined}>
                <div className="comment-header">
                    <div className="production-info">
                        <Link to={`/users/${rating.user_id}`}>
                            <img className="user-avatar" src={rating.profile_picture_url} alt="User avatar"/>
                        </Link>
                        <Link to={`/users/${rating.user_id}`}>
                            <h3 className="text-main">{rating.nickname}</h3>
                        </Link>
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
                        <h4 className="date">{new Date(rating.created_at).toLocaleDateString()}</h4>
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


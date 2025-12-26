import RatingListItem from "./RatingListItem.jsx";

function RatingsList({ ratings, handleDelete, handleUpdate }) {
    return (
        <>
            {(ratings.ratingsList && ratings.ratingsList.length > 0) ? (
                <div className="comments-section">
                    {ratings.ratingsList.map((rating) => (
                        <RatingListItem key={rating.id} rating={rating} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                    ))}
                </div>
            ) : (
                <>
                    <br/>
                    <h3 className="text-main">No ratings yet. Be the first to rate!</h3>
                </>
            )}
        </>
    );
}

export default RatingsList;


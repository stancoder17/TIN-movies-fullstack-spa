import RatingListItem from "./RatingListItem.jsx";

function RatingsList({ ratings }) {
    return (
        <>
            {(ratings.ratingsList && ratings.ratingsList.length > 0) ? (
                <div className="comments-section">
                    {ratings.ratingsList.map((rating) => (
                        <RatingListItem key={rating.id} rating={rating} />
                    ))}
                </div>
            ) : (
                <h3 className="text-accent">No ratings yet. Be the first to rate!</h3>
            )}
        </>
    );
}

export default RatingsList;


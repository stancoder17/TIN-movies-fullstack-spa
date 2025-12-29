function RatingsList({ ratings, handleDelete, handleUpdate, ItemComponent }) {
    return (
        <>
            {(ratings && ratings.length > 0) ? (
                <div className="comments-section">
                    {ratings.map((rating) => (
                        <ItemComponent key={rating.id} rating={rating} handleDelete={handleDelete} handleUpdate={handleUpdate} />
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


function RatingsList({ ratings, handleDelete, handleUpdate, ItemComponent }) {
    return (
        <>
                {(ratings && ratings.length > 0) ? (
                    <>
                        {ratings.map((rating) => (
                            <ItemComponent key={rating.id} rating={rating} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                        ))}
                    </>
                ) : (
                    <>
                        <h3 className="text-main">No ratings found.</h3>
                    </>
                )}
        </>
    );
}

export default RatingsList;


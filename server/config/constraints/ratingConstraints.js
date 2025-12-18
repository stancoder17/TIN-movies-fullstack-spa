const ratingConstraints = {
    userId: {
        required: true,
        min: 1
    },
    movieId: {
        required: true,
        min: 1
    },
    score: {
        required: true,
        min: 1.0,
        max: 10.0,
        increment: 0.1,
        decimalPlaces: 1
    },
    comment: {
        minLength: 0,
        maxLength: 1500
    }
}

export default ratingConstraints;


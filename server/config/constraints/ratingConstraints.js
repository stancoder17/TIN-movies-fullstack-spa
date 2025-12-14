const ratingConstraints = {
    score: {
        required: true,
        min: 1.0,
        max: 10.0,
        step: 0.1,
        decimalPlaces: 1
    },
    comment: {
        minLength: 0,
        maxLength: 1500
    }
}

export default ratingConstraints;


const movieConstraints = {
    title: {
        required: true,
        minLength: 3,
        maxLength: 255
    },
    description: {
        required: true,
        minLength: 0,
        maxLength: 1000
    },
    genre: {
        required: true,
        minLength: 3,
        maxLength: 100
    },
    director: {
        required: true,
        minLength: 3,
        maxLength: 100
    },
    releaseDate: {
        required: true,
        earliest: '1888-01-01'
    },
    runtime: {
        required: true,
        min: 1,
        max: 500
    },
    posterUrl: {
        required: true,
        minLength: 0,
        maxLength: 2083
    }
}

export default movieConstraints;

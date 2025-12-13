const MOVIE_CONSTRAINTS = {
    TITLE: {
        REQUIRED: true,
        MIN_LENGTH: 3,
        MAX_LENGTH: 255
    },
    DESCRIPTION: {
        REQUIRED: true,
        MIN_LENGTH: 0,
        MAX_LENGTH: 1000
    },
    GENRE: {
        REQUIRED: true,
        MIN_LENGTH: 3,
        MAX_LENGTH: 100
    },
    DIRECTOR: {
        REQUIRED: true,
        MIN_LENGTH: 3,
        MAX_LENGTH: 100
    },
    RELEASE_DATE: {
        REQUIRED: true,
        // LATEST is calculated dynamically when needed, not here (if it was here, it would be calculated on server startup, not on every request).
        EARLIEST: '1888-01-01' // The year of the first known film
    },
    RUNTIME: {
        REQUIRED: true,
        MIN: 1, // in minutes
        MAX: 500 // in minutes
    },
    POSTER_URL: {
        REQUIRED: true,
        MIN_LENGTH: 0,
        MAX_LENGTH: 2083 // Maximum URL length
    }
}

export default MOVIE_CONSTRAINTS;

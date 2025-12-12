const MOVIE_CONSTRAINTS = {
    TITLE: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 255
    },
    DESCRIPTION: {
        MIN_LENGTH: 0,
        MAX_LENGTH: 1000
    },
    GENRE: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 100
    },
    DIRECTOR: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 100
    },
    RELEASE_DATE: {
        EARLIEST: '1888-01-01', // The year of the first known film
        // LATEST is calculated dynamically when needed, not here
    },
    RUNTIME: {
        MIN: 1, // in minutes
        MAX: 500 // in minutes
    },
    POSTER_URL: {
        MIN_LENGTH: 0,
        MAX_LENGTH: 2083 // Maximum URL length
    }
}

export default MOVIE_CONSTRAINTS;

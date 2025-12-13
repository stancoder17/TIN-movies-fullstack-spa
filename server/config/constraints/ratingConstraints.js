const RATING_CONSTRAINTS = {
    SCORE: {
        REQUIRED: true,
        MIN: 1.0,
        MAX: 10.0,
        STEP: 0.1,
        DECIMAL_PLACES: 1
    },
    COMMENT: {
        MIN_LENGTH: 0,
        MAX_LENGTH: 1500
    }
    // CREATED_AT is set automatically to the current timestamp by the database (DEFAULT CURRENT_TIMESTAMP)
}

export default RATING_CONSTRAINTS;


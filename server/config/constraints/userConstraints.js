const USER_CONSTRAINTS = {
    NICKNAME: {
        REQUIRED: true,
        MIN_LENGTH: 3,
        MAX_LENGTH: 50
    },
    EMAIL: {
        REQUIRED: true,
        MIN_LENGTH: 5,
        MAX_LENGTH: 100,
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    PASSWORD: {
        REQUIRED: true,
        MIN_LENGTH: 8,
        MAX_LENGTH: 100
    },
    PASSWORD_HASH: { // SHA256
        REQUIRED: true,
        LENGTH: 64, // SHA256 produces 64 hex characters
        PATTERN: /^[a-f0-9]{64}$/ // lower-case version
    },
    PROFILE_PICTURE_URL: {
        MIN_LENGTH: 0,
        MAX_LENGTH: 255,
        PATTERN: /^https?:\/\/.+/i
    },
    DATE_OF_BIRTH: {
        REQUIRED: true,
        // LATEST is calculated dynamically when needed, not here (if it was here, it would be calculated on server startup, not on every request).
        EARLIEST: '1900-01-01',
        MIN_AGE: 13
    },
    BIO: {
        MIN_LENGTH: 0,
        MAX_LENGTH: 1000
    }
}

export default USER_CONSTRAINTS;

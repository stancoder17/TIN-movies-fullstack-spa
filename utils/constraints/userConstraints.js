const userConstraints = {
    nickname: {
        required: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        required: true,
        minLength: 5,
        maxLength: 100,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        required: true,
        minLength: 8,
        maxLength: 100
    },
    profilePictureUrl: {
        minLength: 0,
        maxLength: 255,
        pattern: /^https?:\/\/.+/i
    },
    dateOfBirth: {
        required: true,
        earliest: '1900-01-01', // 'latest' is calculated dynamically when needed, not here (if it was here, it would be calculated on server launch, not on every request)
        minAge: 13
    },
    bio: {
        minLength: 0,
        maxLength: 1000
    }
}

export default userConstraints;

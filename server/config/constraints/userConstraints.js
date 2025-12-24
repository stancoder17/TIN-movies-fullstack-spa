const userConstraints = {
    passwordHash: { // SHA256
        required: true,
        length: 64, // SHA256 produces 64 hex characters
        pattern: /^[a-f0-9]{64}$/ // lower-case version
    },
}

export default userConstraints;
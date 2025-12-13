import userConstraints from '../config/constraints/userConstraints.js'

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

const validateUser = (user) => {
    const errors = [];

    validateNickname(user.nickname, errors);
    validateEmail(user.email, errors);
    validatePassword(user.password, errors);
    validateProfilePictureUrl(user.profile_picture_url, errors);
    validateDateOfBirth(user.date_of_birth, errors);
    validateBio(user.bio, errors);

    return errors;
}

// ============================================================================
// FIELDS VALIDATION FUNCTIONS
// ============================================================================

const validateNickname = (nickname, errors) => {
    const required = userConstraints.NICKNAME.REQUIRED;

    if (!nickname) {
        if (required) {
            errors.push('Nickname is required');
        }
        return;
    }

    if (nickname.length < userConstraints.NICKNAME.MIN_LENGTH || nickname.length > userConstraints.NICKNAME.MAX_LENGTH) {
        errors.push(`Nickname must be between ${userConstraints.NICKNAME.MIN_LENGTH} and ${userConstraints.NICKNAME.MAX_LENGTH} characters long`);
    }
}

const validateEmail = (email, errors) => {
    const required = userConstraints.EMAIL.REQUIRED;

    if (!email) {
        if (required) {
            errors.push('Email is required');
        }
        return;
    }

    if (email.length < userConstraints.EMAIL.MIN_LENGTH || email.length > userConstraints.EMAIL.MAX_LENGTH) {
        errors.push(`Email must be between ${userConstraints.EMAIL.MIN_LENGTH} and ${userConstraints.EMAIL.MAX_LENGTH} characters long`);
    }

    if (!userConstraints.EMAIL.PATTERN.test(email)) {
        errors.push('Email must be a valid email address');
    }
}

const validatePassword = (password, errors) => {
    const required = userConstraints.PASSWORD.REQUIRED;

    if (!password) {
        if (required) {
            errors.push('Password is required');
        }
        return;
    }

    if (password.length < userConstraints.PASSWORD.MIN_LENGTH || password.length > userConstraints.PASSWORD.MAX_LENGTH) {
        errors.push(`Password must be between ${userConstraints.PASSWORD.MIN_LENGTH} and ${userConstraints.PASSWORD.MAX_LENGTH} characters long`);
    }
}

// Internal validation function - NOT used in validateUser()
// This is for server-side validation after hashing, before database insert
const validatePasswordHash = (passwordHash, errors) => {
    const required = userConstraints.PASSWORD_HASH.REQUIRED;

    if (!passwordHash) {
        if (required) {
            errors.push('Password hash is required');
        }
        return;
    }

    if (passwordHash.length !== userConstraints.PASSWORD_HASH.LENGTH) {
        errors.push(`Password hash must be exactly ${userConstraints.PASSWORD_HASH.LENGTH} characters long`);
    }

    if (!userConstraints.PASSWORD_HASH.PATTERN.test(passwordHash.toLowerCase())) {
        errors.push('Password hash must be a valid hexadecimal string');
    }
}

const validateProfilePictureUrl = (profilePictureUrl, errors) => {
    const required = userConstraints.PROFILE_PICTURE_URL.REQUIRED;

    if (!profilePictureUrl) {
        if (required) {
            errors.push('Profile picture URL is required');
        }
        return;
    }

    if (profilePictureUrl.length < userConstraints.PROFILE_PICTURE_URL.MIN_LENGTH || profilePictureUrl.length > userConstraints.PROFILE_PICTURE_URL.MAX_LENGTH) {
        errors.push(`Profile picture URL must be between ${userConstraints.PROFILE_PICTURE_URL.MIN_LENGTH} and ${userConstraints.PROFILE_PICTURE_URL.MAX_LENGTH} characters long`);
    }

    const urlPattern = /^https?:\/\/.+/i;
    if (!userConstraints.PROFILE_PICTURE_URL.PATTERN.test(profilePictureUrl)) {
        errors.push('Profile picture URL must be a valid URL starting with http:// or https://');
    }
}

const validateDateOfBirth = (dateOfBirth, errors) => {
    const required = userConstraints.DATE_OF_BIRTH.REQUIRED;

    if (!dateOfBirth) {
        if (required) {
            errors.push('Date of birth is required');
        }
        return;
    }

    const date = new Date(dateOfBirth);
    const earliest = new Date(userConstraints.DATE_OF_BIRTH.EARLIEST);
    const today = new Date();

    if (isNaN(date.getTime())) {
        errors.push('Date of birth must be a valid date');
        return;
    }

    if (date < earliest) {
        errors.push(`Date of birth cannot be earlier than ${userConstraints.DATE_OF_BIRTH.EARLIEST}`);
    }

    if (date > today) {
        errors.push('Date of birth cannot be in the future');
    }

    // Calculate age
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    const actualAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

    if (actualAge < userConstraints.DATE_OF_BIRTH.MIN_AGE) {
        errors.push(`User must be at least ${userConstraints.DATE_OF_BIRTH.MIN_AGE} years old`);
    }
}

const validateBio = (bio, errors) => {
    const required = userConstraints.BIO.REQUIRED;

    if (!bio) {
        if (required) {
            errors.push('Bio is required');
        }
        return;
    }

    if (bio.length < userConstraints.BIO.MIN_LENGTH || bio.length > userConstraints.BIO.MAX_LENGTH) {
        errors.push(`Bio must be between ${userConstraints.BIO.MIN_LENGTH} and ${userConstraints.BIO.MAX_LENGTH} characters long`);
    }
}

export { validatePasswordHash };
export default validateUser;
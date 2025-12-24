import userConstraints from '../../utils/constraints/userConstraints.js'

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

const validateUser = (req, res, next) => {
    const user = req.body;
    const errors = [];

    validateNickname(user.nickname, errors);
    validateEmail(user.email, errors);
    validatePassword(user.password, errors);
    validateProfilePictureUrl(user.profile_picture_url, errors);
    validateDateOfBirth(user.date_of_birth, errors);
    validateBio(user.bio, errors);

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors
        });
    }

    next();
}

// ============================================================================
// FIELDS VALIDATION FUNCTIONS
// ============================================================================

const validateNickname = (nickname, errors) => {
    const required = userConstraints.nickname.required;

    if (!nickname) {
        if (required) {
            errors.push('Nickname is required');
        }
        return;
    }

    if (nickname.length < userConstraints.nickname.minLength || nickname.length > userConstraints.nickname.maxLength) {
        errors.push(`Nickname must be between ${userConstraints.nickname.minLength} and ${userConstraints.nickname.maxLength} characters long`);
    }
}

const validateEmail = (email, errors) => {
    const required = userConstraints.email.required;

    if (!email) {
        if (required) {
            errors.push('Email is required');
        }
        return;
    }

    if (email.length < userConstraints.email.minLength || email.length > userConstraints.email.maxLength) {
        errors.push(`Email must be between ${userConstraints.email.minLength} and ${userConstraints.email.maxLength} characters long`);
    }

    if (!userConstraints.email.pattern.test(email)) {
        errors.push('Email must be a valid email address');
    }
}

const validatePassword = (password, errors) => {
    const required = userConstraints.password.required;

    if (!password) {
        if (required) {
            errors.push('Password is required');
        }
        return;
    }

    if (password.length < userConstraints.password.minLength || password.length > userConstraints.password.maxLength) {
        errors.push(`Password must be between ${userConstraints.password.minLength} and ${userConstraints.password.maxLength} characters long`);
    }
}

const validatePasswordHash = (passwordHash, errors) => {
    const required = userConstraints.passwordHash.required;

    if (!passwordHash) {
        if (required) {
            errors.push('Password hash is required');
        }
        return;
    }

    if (passwordHash.length !== userConstraints.passwordHash.length) {
        errors.push(`Password hash must be exactly ${userConstraints.passwordHash.length} characters long`);
    }

    if (!userConstraints.passwordHash.pattern.test(passwordHash.toLowerCase())) {
        errors.push('Password hash must be a valid hexadecimal string');
    }
}

const validateProfilePictureUrl = (profilePictureUrl, errors) => {
    const required = userConstraints.profilePictureUrl.required;

    if (!profilePictureUrl) {
        if (required) {
            errors.push('Profile picture URL is required');
        }
        return;
    }

    if (profilePictureUrl.length < userConstraints.profilePictureUrl.minLength || profilePictureUrl.length > userConstraints.profilePictureUrl.maxLength) {
        errors.push(`Profile picture URL must be between ${userConstraints.profilePictureUrl.minLength} and ${userConstraints.profilePictureUrl.maxLength} characters long`);
    }

    if (!userConstraints.profilePictureUrl.pattern.test(profilePictureUrl)) {
        errors.push('Profile picture URL must be a valid URL starting with http:// or https://');
    }
}

const validateDateOfBirth = (dateOfBirth, errors) => {
    const required = userConstraints.dateOfBirth.required;

    if (!dateOfBirth) {
        if (required) {
            errors.push('Date of birth is required');
        }
        return;
    }

    const date = new Date(dateOfBirth);
    const earliest = new Date(userConstraints.dateOfBirth.earliest);
    const today = new Date();

    if (isNaN(date.getTime())) {
        errors.push('Date of birth must be a valid date');
        return;
    }

    if (date < earliest) {
        errors.push(`Date of birth cannot be earlier than ${userConstraints.dateOfBirth.earliest}`);
    }

    if (date > today) {
        errors.push('Date of birth cannot be in the future');
    }

    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    const actualAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

    if (actualAge < userConstraints.dateOfBirth.minAge) {
        errors.push(`User must be at least ${userConstraints.dateOfBirth.minAge} years old`);
    }
}

const validateBio = (bio, errors) => {
    const required = userConstraints.bio.required;

    if (!bio) {
        if (required) {
            errors.push('Bio is required');
        }
        return;
    }

    if (bio.length < userConstraints.bio.minLength || bio.length > userConstraints.bio.maxLength) {
        errors.push(`Bio must be between ${userConstraints.bio.minLength} and ${userConstraints.bio.maxLength} characters long`);
    }
}

export { validatePasswordHash };
export default validateUser;
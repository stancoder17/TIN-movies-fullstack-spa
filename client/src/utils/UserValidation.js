import userConstraints from '../../../utils/constraints/userConstraints.js';

const validateNickname = (nickname) => {
    if (userConstraints.nickname.required && !nickname?.trim()) {
        return 'Nickname is required';
    }

    if (nickname && (nickname.length < userConstraints.nickname.minLength || nickname.length > userConstraints.nickname.maxLength)) {
        return `Nickname must be between ${userConstraints.nickname.minLength} and ${userConstraints.nickname.maxLength} characters long`;
    }

    return null;
};

const validateEmail = (email) => {
    if (userConstraints.email.required && !email?.trim()) {
        return 'Email is required';
    }

    if (email) {
        if (email.length < userConstraints.email.minLength || email.length > userConstraints.email.maxLength) {
            return `Email must be between ${userConstraints.email.minLength} and ${userConstraints.email.maxLength} characters long`;
        }

        if (!userConstraints.email.pattern.test(email)) {
            return 'Email must be a valid email address';
        }
    }

    return null;
};

const validatePasswordUpdate = (password) => {
    // Password is optional when updating user, required when registering
    if (!password) {
        return null;
    }

    if (password && (password.length < userConstraints.password.minLength || password.length > userConstraints.password.maxLength)) {
        return `Password must be between ${userConstraints.password.minLength} and ${userConstraints.password.maxLength} characters long`;
    }

    return null;
};

const validatePasswordPost = (password) => {
    if (userConstraints.password.required && !password) {
        return 'Password is required';
    }

    if (password && (password.length < userConstraints.password.minLength || password.length > userConstraints.password.maxLength)) {
        return `Password must be between ${userConstraints.password.minLength} and ${userConstraints.password.maxLength} characters long`;
    }

    return null;
};

const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
        return 'Please confirm your password';
    }

    if (confirmPassword !== password) {
        return 'Passwords do not match';
    }

    return null;
};

const validateProfilePictureUrl = (profilePictureUrl) => {
    if (userConstraints.profilePictureUrl.required && !profilePictureUrl?.trim()) {
        return 'Profile picture URL is required';
    }

    if (profilePictureUrl) {
        if (profilePictureUrl.length < userConstraints.profilePictureUrl.minLength || profilePictureUrl.length > userConstraints.profilePictureUrl.maxLength) {
            return `Profile picture URL must be between ${userConstraints.profilePictureUrl.minLength} and ${userConstraints.profilePictureUrl.maxLength} characters long`;
        }

        if (profilePictureUrl.trim() && !userConstraints.profilePictureUrl.pattern.test(profilePictureUrl)) {
            return 'Profile picture URL must be a valid URL starting with http:// or https://';
        }
    }

    return null;
};

const validateDateOfBirth = (dateOfBirth) => {
    if (userConstraints.dateOfBirth.required && !dateOfBirth) {
        return 'Date of birth is required';
    }

    if (dateOfBirth) {
        if (dateOfBirth < userConstraints.dateOfBirth.earliest) {
            return `Date of birth cannot be earlier than ${userConstraints.dateOfBirth.earliest}`;
        }

        if (dateOfBirth > new Date().toISOString().split('T')[0]) {
            return 'Date of birth cannot be in the future';
        }

        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        const actualAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

        if (actualAge < userConstraints.dateOfBirth.minAge) {
            return `You must be at least ${userConstraints.dateOfBirth.minAge} years old`;
        }
    }

    return null;
};

const validateBio = (bio) => {
    // Bio is optional
    if (!bio) {
        return null;
    }

    if (bio && (bio.length < userConstraints.bio.minLength || bio.length > userConstraints.bio.maxLength)) {
        return `Bio must be between ${userConstraints.bio.minLength} and ${userConstraints.bio.maxLength} characters long`;
    }

    return null;
};

export {
    validateNickname,
    validateEmail,
    validatePasswordUpdate,
    validatePasswordPost,
    validateConfirmPassword,
    validateProfilePictureUrl,
    validateDateOfBirth,
    validateBio
};


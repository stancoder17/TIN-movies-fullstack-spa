import ratingConstraints from '../../utils/constraints/ratingConstraints.js'

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

const validateRating = (req, res, next) => {
    const rating = req.body;
    const errors = [];

    // validateUserId(rating.user_id, errors);
    // validateMovieId(rating.movie_id, errors);
    validateScore(rating.score, errors);
    validateComment(rating.comment, errors);

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

const validateUserId = (userId, errors) => {
    const required = ratingConstraints.userId.required;

    if (userId === undefined || userId === null || userId === '') {
        if (required) {
            errors.push('User ID is required');
        }
        return;
    }

    const userIdNum = Number(userId);

    if (isNaN(userIdNum) || !Number.isInteger(userIdNum)) {
        errors.push('User ID must be an integer');
        return;
    }

    if (userIdNum < ratingConstraints.userId.min) {
        errors.push(`User ID must be at least ${ratingConstraints.userId.min}`);
    }
}

const validateMovieId = (movieId, errors) => {
    const required = ratingConstraints.movieId.required;

    if (movieId === undefined || movieId === null || movieId === '') {
        if (required) {
            errors.push('Movie ID is required');
        }
        return;
    }

    const movieIdNum = Number(movieId);

    if (isNaN(movieIdNum) || !Number.isInteger(movieIdNum)) {
        errors.push('Movie ID must be an integer');
        return;
    }

    if (movieIdNum < ratingConstraints.movieId.min) {
        errors.push(`Movie ID must be at least ${ratingConstraints.movieId.min}`);
    }
}

const validateScore = (score, errors) => {
    const required = ratingConstraints.score.required;

    if (score === undefined || score === null || score === '') {
        if (required) {
            errors.push('Score is required');
        }
        return;
    }

    const scoreNum = Number(score);

    if (isNaN(scoreNum)) {
        errors.push('Score must be a number');
        return;
    }

    if (scoreNum < ratingConstraints.score.min || scoreNum > ratingConstraints.score.max) {
        errors.push(`Score must be between ${ratingConstraints.score.min} and ${ratingConstraints.score.max}`);
    }

    // Check increment
    // Min. score is subtracted, because increments are calculated from there
    // Example: 1.3 - 1.0 = 0.3; 0.3 % 0.3 = 0 -> valid
    // without subtraction: 1.3 % 0.3 != 0 -> invalid
    // then the score is multiplied to prevent floating-point division
    const dividend = Math.round((scoreNum - ratingConstraints.score.min) * 10 * ratingConstraints.score.max);
    const divisor = Math.round(ratingConstraints.score.increment * 10 * ratingConstraints.score.max);
    if (dividend % divisor !== 0) {
        errors.push('Score must be in increments of ' + ratingConstraints.score.increment);
    }

    // Check decimalPlaces
    const decimalPlaces = score.toString().split('.')[1];
    if (decimalPlaces) { // decimalPlaces is undefined if score is an integer
        if (decimalPlaces.length > ratingConstraints.score.decimalPlaces) {
            errors.push(`Score must have at most ${ratingConstraints.score.decimalPlaces} decimal places`);
        }
    }
}

const validateComment = (comment, errors) => {
    const required = ratingConstraints.comment.required;

    if (!comment) {
        if (required) {
            errors.push('Comment is required');
        }
        return;
    }

    if (comment.length < ratingConstraints.comment.minLength || comment.length > ratingConstraints.comment.maxLength) {
        errors.push(`Comment must be between ${ratingConstraints.comment.minLength} and ${ratingConstraints.comment.maxLength} characters long`);
    }
}

export default validateRating;
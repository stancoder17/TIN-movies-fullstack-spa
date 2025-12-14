import ratingConstraints from '../config/constraints/ratingConstraints.js'

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

const validateRating = (req, res, next) => {
    const rating = req.body;
    const errors = [];

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
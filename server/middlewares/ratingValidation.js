import ratingConstraints from '../config/constraints/ratingConstraints.js'

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

const validateRating = (rating) => {
    const errors = [];

    validateScore(rating.score, errors);
    validateComment(rating.comment, errors);

    return errors;
}

// ============================================================================
// FIELDS VALIDATION FUNCTIONS
// ============================================================================

const validateScore = (score, errors) => {
    const required = ratingConstraints.SCORE.REQUIRED;

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

    if (scoreNum < ratingConstraints.SCORE.MIN || scoreNum > ratingConstraints.SCORE.MAX) {
        errors.push(`Score must be between ${ratingConstraints.SCORE.MIN} and ${ratingConstraints.SCORE.MAX}`);
    }
}

const validateComment = (comment, errors) => {
    const required = ratingConstraints.COMMENT.REQUIRED;

    if (!comment) {
        if (required) {
            errors.push('Comment is required');
        }
        return;
    }

    if (comment.length < ratingConstraints.COMMENT.MIN_LENGTH || comment.length > ratingConstraints.COMMENT.MAX_LENGTH) {
        errors.push(`Comment must be between ${ratingConstraints.COMMENT.MIN_LENGTH} and ${ratingConstraints.COMMENT.MAX_LENGTH} characters long`);
    }
}

export default validateRating;


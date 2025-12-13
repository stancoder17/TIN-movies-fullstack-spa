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

    // Check the step constraint (0.1 increments)
    if (!Number.isInteger(scoreNum * 10)) { // 7.1 true; 7.12 false
        errors.push(`Score must be in increments of ${ratingConstraints.SCORE.STEP}`);
    }

    // Check decimal places
    const scoreStr = scoreNum.toString();
    if (scoreStr.includes('.')) {
        const decimalPlaces = scoreStr.split('.')[1].length;
        if (decimalPlaces > ratingConstraints.SCORE.DECIMAL_PLACES) {
            errors.push(`Score must have at most ${ratingConstraints.SCORE.DECIMAL_PLACES} decimal place(s)`);
        }
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


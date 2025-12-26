import ratingConstraints from '../../utils/constraints/ratingConstraints.js';

const calculateAverageScore = (ratings) => {
    if (ratings.length === 0) {
        return 'N/A';
    }

    let ratingSum = 0;
    for (const rating of ratings) {
        ratingSum += rating.score;
    }

    return Math.round((ratingSum / ratings.length) * 10) / 10;
}

const roundScore = (score) => {
    const multiplier = Math.pow(10, ratingConstraints.score.decimalPlaces);
    return Math.round(score * multiplier) / multiplier;
}

export { calculateAverageScore, roundScore };

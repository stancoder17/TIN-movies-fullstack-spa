const calculateAverageScore = (ratings) => {
    let averageScore = null;

    if (ratings.length === 0) {
        return averageScore;
    }

    let ratingSum = 0;
    for (const rating of ratings) {
        ratingSum += rating.score;
    }

    return Math.round((ratingSum / ratings.length) * 10) / 10;
}

export { calculateAverageScore };
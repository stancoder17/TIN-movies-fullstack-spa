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

export { calculateAverageScore };
// null/undefined -> 'N/A'
// 8.11 -> 8.1
// 8.0 -> 8
const formatRatingScore = (score) => {
    if (!score) return 'N/A';
    const rounded = score.toFixed(1);
    return Number.isInteger(score) ? Math.round(score) : rounded;
};

export { formatRatingScore };
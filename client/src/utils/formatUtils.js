// null/undefined -> 'N/A'
// 8.11 -> 8.1
// 8.0 -> 8
const formatRatingScore = (score) => {
    if (!score) return 'N/A';
    const rounded = score.toFixed(1);
    return Number.isInteger(score) ? Math.round(score) : rounded;
};

// Format date to locale string
// Pass options object to customize format
const formatDate = (dateString, options = {}) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return 'Invalid Date';

    // Default options for date only (no time)
    const defaultOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        ...options
    };

    return date.toLocaleString(undefined, defaultOptions);
};

export { formatRatingScore, formatDate };

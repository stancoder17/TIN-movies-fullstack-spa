import movieConstraints from '../../../utils/constraints/movieConstraints.js';

const validateTitle = (title) => {
    if (movieConstraints.title.required && !title?.trim()) {
        return 'Title is required';
    }

    if (title && (title.length < movieConstraints.title.minLength || title.length > movieConstraints.title.maxLength)) {
        return `Title must be between ${movieConstraints.title.minLength} and ${movieConstraints.title.maxLength} characters long`;
    }

    return null;
};

const validateDescription = (description) => {
    if (movieConstraints.description.required && !description?.trim()) {
        return 'Description is required';
    }

    if (description && (description.length < movieConstraints.description.minLength || description.length > movieConstraints.description.maxLength)) {
        return `Description must be between ${movieConstraints.description.minLength} and ${movieConstraints.description.maxLength} characters long`;
    }

    return null;
};

const validateGenre = (genre) => {
    if (movieConstraints.genre.required && !genre?.trim()) {
        return 'Genre is required';
    }

    if (genre && (genre.length < movieConstraints.genre.minLength || genre.length > movieConstraints.genre.maxLength)) {
        return `Genre must be between ${movieConstraints.genre.minLength} and ${movieConstraints.genre.maxLength} characters long`;
    }

    return null;
};

const validateDirector = (director) => {
    if (movieConstraints.director.required && !director?.trim()) {
        return 'Director is required';
    }

    if (director && (director.length < movieConstraints.director.minLength || director.length > movieConstraints.director.maxLength)) {
        return `Director must be between ${movieConstraints.director.minLength} and ${movieConstraints.director.maxLength} characters long`;
    }

    return null;
};

const validateReleaseDate = (releaseDate) => {
    if (movieConstraints.releaseDate.required && !releaseDate) {
        return 'Release date is required';
    }

    if (releaseDate) {
        if (releaseDate < movieConstraints.releaseDate.earliest) {
            return `Release date cannot be earlier than ${movieConstraints.releaseDate.earliest}`;
        }

        if (releaseDate > new Date().toISOString().split('T')[0]) {
            return 'Release date cannot be in the future';
        }
    }

    return null;
};

const validateRuntime = (runtime) => {
    if (movieConstraints.runtime.required && !runtime) {
        return 'Runtime is required';
    }

    const runtimeNumber = Number(runtime);
    if (runtime && (runtimeNumber < movieConstraints.runtime.min || runtimeNumber > movieConstraints.runtime.max)) {
        return `Runtime must be between ${movieConstraints.runtime.min} and ${movieConstraints.runtime.max} minutes`;
    }

    return null;
};

const validatePosterUrl = (posterUrl) => {
    if (movieConstraints.posterUrl.required && !posterUrl?.trim()) {
        return 'Poster URL is required';
    }

    if (posterUrl) {
        if (posterUrl.length < movieConstraints.posterUrl.minLength || posterUrl.length > movieConstraints.posterUrl.maxLength) {
            return `Poster URL must be between ${movieConstraints.posterUrl.minLength} and ${movieConstraints.posterUrl.maxLength} characters long`;
        }

        if (!movieConstraints.posterUrl.pattern.test(posterUrl)) {
            return 'Poster URL must be a valid URL starting with http:// or https://';
        }
    }

    return null;
};

const validateYoutubeHtmlUrl = (youtubeHtmlUrl) => {
    if (movieConstraints.youtubeHtmlUrl.required && !youtubeHtmlUrl?.trim()) {
        return 'YouTube URL is required';
    }

    if (youtubeHtmlUrl) {
        if (youtubeHtmlUrl.length < movieConstraints.youtubeHtmlUrl.minLength || youtubeHtmlUrl.length > movieConstraints.youtubeHtmlUrl.maxLength) {
            return `YouTube URL must be between ${movieConstraints.youtubeHtmlUrl.minLength} and ${movieConstraints.youtubeHtmlUrl.maxLength} characters long`;
        }

        if (!movieConstraints.youtubeHtmlUrl.pattern.test(youtubeHtmlUrl)) {
            return 'YouTube URL must be a valid YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)';
        }
    }

    return null;
};

export {
    validateTitle,
    validateDescription,
    validateGenre,
    validateDirector,
    validateReleaseDate,
    validateRuntime,
    validatePosterUrl,
    validateYoutubeHtmlUrl
};


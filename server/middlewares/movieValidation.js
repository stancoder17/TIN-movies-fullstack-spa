import movieConstraints from '../config/constraints/movieConstraints.js'

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

const validateMovie = (movie) => {
    const errors = [];

    validateTitle(movie.title, errors);
    validateDescription(movie.description, errors);
    validateGenre(movie.genre, errors);
    validateDirector(movie.director, errors);
    validateReleaseDate(movie.release_date, errors);
    validateRuntime(movie.runtime, errors);
    validatePosterUrl(movie.poster_url, errors);

    return errors;
}

// ============================================================================
// FIELDS VALIDATION FUNCTIONS
// ============================================================================

const validateTitle = (title, errors) => {
    const required = movieConstraints.TITLE.REQUIRED;

    if (!title) {
        if (required) {
            errors.push('Title is required');
        }
        return;
    }

    if (title.length < movieConstraints.TITLE.MIN_LENGTH || title.length > movieConstraints.TITLE.MAX_LENGTH) {
        errors.push(`Title must be between ${movieConstraints.TITLE.MIN_LENGTH} and ${movieConstraints.TITLE.MAX_LENGTH} characters long`);
    }
}

const validateDescription = (description, errors) => {
    const required = movieConstraints.DESCRIPTION.REQUIRED;

    if (!description) {
        if (required) {
            errors.push('Description is required');
        }
        return;
    }

    if (description.length < movieConstraints.DESCRIPTION.MIN_LENGTH || description.length > movieConstraints.DESCRIPTION.MAX_LENGTH) {
        errors.push(`Description must be between ${movieConstraints.DESCRIPTION.MIN_LENGTH} and ${movieConstraints.DESCRIPTION.MAX_LENGTH} characters long`);
    }
}

const validateGenre = (genre, errors) => {
    const required = movieConstraints.GENRE.REQUIRED;

    if (!genre) {
        if (required) {
            errors.push('Genre is required');
        }
        return;
    }

    if (genre.length < movieConstraints.GENRE.MIN_LENGTH || genre.length > movieConstraints.GENRE.MAX_LENGTH) {
        errors.push(`Genre must be between ${movieConstraints.GENRE.MIN_LENGTH} and ${movieConstraints.GENRE.MAX_LENGTH} characters long`);
    }
}

const validateDirector = (director, errors) => {
    const required = movieConstraints.DIRECTOR.REQUIRED;

    if (!director) {
        if (required) {
            errors.push('Director is required');
        }
        return;
    }

    if (director.length < movieConstraints.DIRECTOR.MIN_LENGTH || director.length > movieConstraints.DIRECTOR.MAX_LENGTH) {
        errors.push(`Director must be between ${movieConstraints.DIRECTOR.MIN_LENGTH} and ${movieConstraints.DIRECTOR.MAX_LENGTH} characters long`);
    }
}

const validateReleaseDate = (releaseDate, errors) => {
    const required = movieConstraints.RELEASE_DATE.REQUIRED;

    if (!releaseDate) {
        if (required) {
            errors.push('Release date is required');
        }
        return;
    }

    const date = new Date(releaseDate);
    const minDate = new Date(movieConstraints.RELEASE_DATE.EARLIEST);
    const maxDate = new Date(); // Current date

    if (isNaN(date.getTime())) {
        errors.push('Release date must be a valid date');
        return;
    }

    if (date < minDate) {
        errors.push(`Release date cannot be earlier than ${movieConstraints.RELEASE_DATE.EARLIEST}`);
    }

    if (date > maxDate) {
        errors.push('Release date cannot be in the future');
    }
}

const validateRuntime = (runtime, errors) => {
    const required = movieConstraints.RUNTIME.REQUIRED;

    if (runtime === undefined || runtime === null || runtime === '') {
        if (required) {
            errors.push('Runtime is required');
        }
        return;
    }

    const runtimeNum = Number(runtime);

    if (isNaN(runtimeNum) || !Number.isInteger(runtimeNum)) {
        errors.push('Runtime must be an integer value');
        return;
    }

    if (runtimeNum < movieConstraints.RUNTIME.MIN || runtimeNum > movieConstraints.RUNTIME.MAX) {
        errors.push(`Runtime must be between ${movieConstraints.RUNTIME.MIN} and ${movieConstraints.RUNTIME.MAX} minutes`);
    }
}

const validatePosterUrl = (posterUrl, errors) => {
    const required = movieConstraints.POSTER_URL.REQUIRED;

    if (!posterUrl) {
        if (required) {
            errors.push('Poster URL is required');
        }
        return;
    }

    if (posterUrl.length < movieConstraints.POSTER_URL.MIN_LENGTH || posterUrl.length > movieConstraints.POSTER_URL.MAX_LENGTH) {
        errors.push(`Poster URL must be between ${movieConstraints.POSTER_URL.MIN_LENGTH} and ${movieConstraints.POSTER_URL.MAX_LENGTH} characters long`);
    }
}

export default validateMovie;

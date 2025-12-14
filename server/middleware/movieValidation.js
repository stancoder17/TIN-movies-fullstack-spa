import movieConstraints from '../config/constraints/movieConstraints.js'

// ============================================================================
// MAIN VALIDATION FUNCTION
// ============================================================================

const validateMovie = (req, res, next) => {
    const movie = req.body;
    const errors = [];

    validateTitle(movie.title, errors);
    validateDescription(movie.description, errors);
    validateGenre(movie.genre, errors);
    validateDirector(movie.director, errors);
    validateReleaseDate(movie.release_date, errors);
    validateRuntime(movie.runtime, errors);
    validatePosterUrl(movie.poster_url, errors);

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

const validateTitle = (title, errors) => {
    const required = movieConstraints.title.required;

    if (!title) {
        if (required) {
            errors.push('Title is required');
        }
        return;
    }

    if (title.length < movieConstraints.title.minLength || title.length > movieConstraints.title.maxLength) {
        errors.push(`Title must be between ${movieConstraints.title.minLength} and ${movieConstraints.title.maxLength} characters long`);
    }
}

const validateDescription = (description, errors) => {
    const required = movieConstraints.description.required;

    if (!description) {
        if (required) {
            errors.push('Description is required');
        }
        return;
    }

    if (description.length < movieConstraints.description.minLength || description.length > movieConstraints.description.maxLength) {
        errors.push(`Description must be between ${movieConstraints.description.minLength} and ${movieConstraints.description.maxLength} characters long`);
    }
}

const validateGenre = (genre, errors) => {
    const required = movieConstraints.genre.required;

    if (!genre) {
        if (required) {
            errors.push('Genre is required');
        }
        return;
    }

    if (genre.length < movieConstraints.genre.minLength || genre.length > movieConstraints.genre.maxLength) {
        errors.push(`Genre must be between ${movieConstraints.genre.minLength} and ${movieConstraints.genre.maxLength} characters long`);
    }
}

const validateDirector = (director, errors) => {
    const required = movieConstraints.director.required;

    if (!director) {
        if (required) {
            errors.push('Director is required');
        }
        return;
    }

    if (director.length < movieConstraints.director.minLength || director.length > movieConstraints.director.maxLength) {
        errors.push(`Director must be between ${movieConstraints.director.minLength} and ${movieConstraints.director.maxLength} characters long`);
    }
}

const validateReleaseDate = (releaseDate, errors) => {
    const required = movieConstraints.releaseDate.required;

    if (!releaseDate) {
        if (required) {
            errors.push('Release date is required');
        }
        return;
    }

    const date = new Date(releaseDate);
    const minDate = new Date(movieConstraints.releaseDate.earliest);
    const maxDate = new Date();

    if (isNaN(date.getTime())) {
        errors.push('Release date must be a valid date');
        return;
    }

    if (date < minDate) {
        errors.push(`Release date cannot be earlier than ${movieConstraints.releaseDate.earliest}`);
    }

    if (date > maxDate) {
        errors.push('Release date cannot be in the future');
    }
}

const validateRuntime = (runtime, errors) => {
    const required = movieConstraints.runtime.required;

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

    if (runtimeNum < movieConstraints.runtime.min || runtimeNum > movieConstraints.runtime.max) {
        errors.push(`Runtime must be between ${movieConstraints.runtime.min} and ${movieConstraints.runtime.max} minutes`);
    }
}

const validatePosterUrl = (posterUrl, errors) => {
    const required = movieConstraints.posterUrl.required;

    if (!posterUrl) {
        if (required) {
            errors.push('Poster URL is required');
        }
        return;
    }

    if (posterUrl.length < movieConstraints.posterUrl.minLength || posterUrl.length > movieConstraints.posterUrl.maxLength) {
        errors.push(`Poster URL must be between ${movieConstraints.posterUrl.minLength} and ${movieConstraints.posterUrl.maxLength} characters long`);
    }
}

export default validateMovie;
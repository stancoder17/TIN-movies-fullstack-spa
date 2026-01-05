import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styles from './MovieAddOrEdit.module.css';
import {
    validateTitle,
    validateDescription,
    validateGenre,
    validateDirector,
    validateReleaseDate,
    validateRuntime,
    validatePosterUrl,
    validateYoutubeHtmlUrl
} from '../../utils/MovieValidation.js';

// One component for movie POST and UPDATE, dependent on beingEdited prop
function MovieAddOrEdit({beingEdited = false}) {
    const navigate = useNavigate();
    const {id} = useParams();
    const [fields, setFields] = useState(null);
    const [errors, setErrors] = useState({});
    const [movieFound, setMovieFound] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        director: '',
        release_date: '',
        runtime: '',
        poster_url: '',
        youtube_html_url: ''
    });

    // Values dependent on component mode (adding vs editing)
    const title = beingEdited ? 'Edit Movie' : 'Add New Movie';
    const submitLabel = beingEdited ? 'Update' : 'Add';
    const method = beingEdited ? 'PUT' : 'POST';
    const url = beingEdited
        ? `http://localhost:5000/api/movies/${id}`
        : 'http://localhost:5000/api/movies';

    useEffect(() => {
        fetch('http://localhost:5000/api/movies/create-or-update-fields')
            .then(response => response.json())
            .then(data => setFields(data))
            .catch(error => console.error('Error fetching movie form fields:', error));

        if (beingEdited && id) {
            fetch(`http://localhost:5000/api/movies/${id}`)
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            setMovieFound(false);
                            return null;
                        }
                    }
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        setFormData({
                            title: data.title || '',
                            description: data.description || '',
                            genre: data.genre || '',
                            director: data.director || '',
                            release_date: data.release_date || '',
                            runtime: data.runtime || '',
                            poster_url: data.poster_url || '',
                            youtube_html_url: data.youtube_html_url || ''
                        });
                    }
                })
                .catch(error => console.error('Error fetching movie data:', error));
        }
    }, [beingEdited, id]);

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: validateField(name, value)});
    };

    const validateField = (fieldName, fieldValue) => {
        switch (fieldName) {
            case 'title':
                return validateTitle(fieldValue);
            case 'description':
                return validateDescription(fieldValue);
            case 'genre':
                return validateGenre(fieldValue);
            case 'director':
                return validateDirector(fieldValue);
            case 'release_date':
                return validateReleaseDate(fieldValue);
            case 'runtime':
                return validateRuntime(fieldValue);
            case 'poster_url':
                return validatePosterUrl(fieldValue);
            case 'youtube_html_url':
                return validateYoutubeHtmlUrl(fieldValue);
            default:
                return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                allErrors[key] = error;
            }
        });

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
            return;
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // 'replace' to avoid going back to the form on browser 'back' operation
            if (response.ok) {
                if (beingEdited) {
                    navigate(`/movies/${id}`, { replace: true });
                } else {
                    const data = await response.json();
                    navigate(`/movies/${data.id}`, { replace: true });
                }
            }
        } catch (error) {
            console.error('Error submitting movie:', error);
        }
    }

    return (
        <div className={styles.movieAddOrEditPageWrapper}>
            <div className={`main-content ${styles.mainContent || ''}`.trim()}>
                {(!beingEdited || movieFound) ? (
                    <div className={`form-container ${styles.formContainer || ''}`.trim()}>
                        <h1 className="text-main">{title}</h1>

                        <hr className="separator"/>

                        <form className="add-form" noValidate onSubmit={handleSubmit}>
                            <div className="form-inputs-container">
                                {fields && fields.map(field => (
                                    <div key={field.name} className={styles.formInputGroup}>
                                        {beingEdited ? <label htmlFor={field.name} className="text-main">{field.label}</label> : null}
                                        {field.type === 'textarea' ? (
                                            <>
                                                {errors[field.name] && <span className="form-error-brighter">{errors[field.name]}</span>}
                                                <textarea
                                                    id={field.name}
                                                    name={field.name}
                                                    placeholder={field.label}
                                                    className={`form-input form-input-description ${styles.formInput || ''} ${styles.formInputDescription || ''}`.trim()}
                                                    required={field.required}
                                                    minLength={field.minLength}
                                                    maxLength={field.maxLength}
                                                    value={formData[field.name] || ''}
                                                    onChange={onChange}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {errors[field.name] && <span className="form-error-brighter">{errors[field.name]}</span>}
                                                <input
                                                    type={field.type}
                                                    id={field.name}
                                                    name={field.name}
                                                    placeholder={field.label}
                                                    className={`form-input ${styles.formInput || ''}`.trim()}
                                                    required={field.required}
                                                    minLength={field.minLength}
                                                    maxLength={field.maxLength}
                                                    min={field.min}
                                                    max={field.max}
                                                    pattern={field.pattern}
                                                    value={formData[field.name] || ''}
                                                    onChange={onChange}
                                                />
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className={`form-buttons-etc ${styles.formButtonsEtc || ''}`.trim()}>
                                <button type="submit" className={`btn-blue wide ${styles.wide || ''}`.trim()}>{submitLabel}</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <p className="text-main">404 not found.</p>
                )}
            </div>
        </div>
    )
}

export default MovieAddOrEdit;

import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './MovieAddOrEdit.css';

// One component for movie POST and UPDATE, dependent on beingEdited prop
function MovieAddOrEdit({beingEdited = false}) {
    const navigate = useNavigate();
    const {id} = useParams();
    const [fields, setFields] = useState(null);
    const [editedMovieData, setEditedMovieData] = useState(null);

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
                .then(response => response.json())
                .then(data => setEditedMovieData(data))
                .catch(error => console.error('Error fetching movie data:', error));
        }
    }, [beingEdited, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const movieData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
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
        }catch (error) {
            console.error('Error submitting movie:', error);
        }
    }

    // Helper function to get default value for a field
    const getDefaultValue = (fieldName) => {
        if (!beingEdited || !editedMovieData) return '';
        return editedMovieData[fieldName] || '';
    };

    return (
        <div className="main-content">
            <div className="form-container">
                <h1 className="text-main">{title}</h1>

                <hr className="separator"/>

                <form className="add-form" onSubmit={handleSubmit}>
                    <div className="form-inputs-container">
                        {fields && fields.map(field => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="text-main">{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.label}
                                        className="form-input form-input-description"
                                        required={field.required}
                                        minLength={field.minLength}
                                        maxLength={field.maxLength}
                                        defaultValue={getDefaultValue(field.name)}
                                    />
                                ) : (
                                    <input
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.label}
                                        className="form-input"
                                        required={field.required}
                                        minLength={field.minLength}
                                        maxLength={field.maxLength}
                                        min={field.min}
                                        max={field.max}
                                        pattern={field.pattern}
                                        defaultValue={getDefaultValue(field.name)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="form-buttons-etc">
                        <button type="submit" className="btn-blue wide">{submitLabel}</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default MovieAddOrEdit;

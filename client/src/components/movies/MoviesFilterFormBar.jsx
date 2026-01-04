import {useState} from "react";
import {useEffect} from "react";
import DateRangeSliderInput from "./DateRangeSliderInput.jsx";
import styles from './MoviesPage.module.css';
import { Pagination } from '../common/Pagination.jsx';

function MoviesFilterFormBar({searchParams, setSearchParams})  {
    const [fields, setFields] = useState({
        genres: [],
        minDate: null,
        maxDate: null
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/movies/filter-fields")
            .then(response => response.json())
            .then(data => setFields(data))
            .catch(error => {
                console.error("Error fetching movie filter form fields:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target); // get data from the submitted form

        const genres = formData.getAll('genres'); // returns an array
        const minDate = formData.get('minDate');
        const maxDate = formData.get('maxDate');

        const currentParams = new URLSearchParams(searchParams);

        // Delete previous parameters (except page and limit)
        currentParams.delete('genres');
        currentParams.delete('minDate');
        currentParams.delete('maxDate');

        // Example: genres=action&genres=comedy...
        if (genres.length > 0) {
            genres.forEach(genre => currentParams.append('genres', genre));
        }

        if (minDate) {
            currentParams.append('minDate', minDate);
        }

        if (maxDate) {
            currentParams.append('maxDate', maxDate);
        }

        currentParams.set('page', Pagination.constraints.defaultPage.toString()); // reset to the first page on new filter

        setSearchParams(currentParams);
    }

    return (
        <div className={`form-container-unstyled ${styles.formContainerUnstyled || ''}`.trim()}>
            <form className={styles.filtersForm} onSubmit={handleSubmit}>
                <div className={`form-inputs-container ${styles.formInputsContainer || ''}`.trim()}>
                    <div className={`form-input-group ${styles.formInputGroup || ''}`.trim()}>
                        <h3 className="text-main">Genre:</h3>
                        {
                            fields.genres.map(genre => (
                                <div key={'genre-' + genre.value }>
                                    <input type='checkbox' id={'genre-' + genre.value} name={genre.name} value={genre.value} defaultChecked={genre.checked}/>
                                    <label htmlFor={'genre-' + genre.value} className="text-main">{genre.label}</label>
                                </div>
                                )
                            )
                        }
                    </div>

                    <div className={`form-input-group ${styles.formInputGroup || ''}`.trim()}>
                        <h3 className="text-main">Year:</h3>
                        {fields.minDate !== null && fields.maxDate !== null && ( // only render if dates are loaded, component is rendered before data fetch (which is asynchronous) is finished.
                            <DateRangeSliderInput minDate={fields.minDate} maxDate={fields.maxDate} />
                        )}
                    </div>

                </div>

                <div className={`form-buttons-etc ${styles.formButtonsEtc || ''}`.trim()}>
                    <button type="submit" className={`wide ${styles.wide || ''}`.trim()}>Filter</button>
                </div>
            </form>
        </div>
    );
}

export default MoviesFilterFormBar;
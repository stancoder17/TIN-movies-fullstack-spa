import {useState} from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DateRangeSliderInput from "./DateRangeSliderInput.jsx";

function MoviesFilterFormBar() {
    const navigate = useNavigate();
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

        // Build query string and navigate to new URL
        const params = new URLSearchParams();

        // Example: genres=action&genres=comedy...
        if (genres.length > 0) {
            genres.forEach(genre => params.append('genres', genre));
        }

        if (minDate) {
            params.append('minDate', minDate);
        }

        if (maxDate) {
            params.append('maxDate', maxDate);
        }

        // Navigate to URL with query params
        navigate(`/movies?${params.toString()}`);
    }

    return (
        <div className="form-container-unstyled">
            <form onSubmit={handleSubmit}>
                <div className="form-inputs-container">
                    <div className="form-input-group">
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

                    <div className="form-input-group">
                        <h3 className="text-main">Year:</h3>
                        {fields.minDate !== null && fields.maxDate !== null && ( // only render if dates are loaded, component is rendered before data fetch (which is asynchronous) is finished.
                            <DateRangeSliderInput minDate={fields.minDate} maxDate={fields.maxDate} />
                        )}
                    </div>

                </div>

                <div className="form-buttons-etc">
                    <button type="submit" className="wide">Filter</button>
                </div>
            </form>
        </div>
    );
}

export default MoviesFilterFormBar;
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import '../../main.css'

function TopXMovies() {
    const [movies, setMovies] = useState([])
    const count = 5;

    useEffect(() => {
        fetch("http://localhost:5000/api/movies/top/" + count)
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error(`Error fetching top ${count} movies:`, error))
    }, [])

    return (
        <div className="link-group">
            <h5 className="text-main">Top {count} Movies</h5>
            <ul className="list-unstyled">
                {movies.map(movie => (
                        <li key={movie.id}>
                            <Link to={`movies/${movie.id}`}>{movie.title}</Link>
                        </li>
                        )
                    )}
            </ul>

        </div>
    )
}

export default TopXMovies;
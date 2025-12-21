import {useEffect, useState} from "react";
import MovieListItem from "./MovieListItem.jsx";

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const addMovie = (newMovie) => {
        setMovies([...movies, newMovie]);
    }

    useEffect(() => {
        fetch("http://localhost:5000/api/movies")
            .then(response => response.json())
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
                setLoading(false);
            });
    }, [])

    return (
        <>
            {movies.map((movie) => (
                <MovieListItem key={movie.id} movie={movie} />
            ))}
        </>
    )
}

export default MovieList;
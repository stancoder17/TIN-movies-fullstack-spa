import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import MovieListItem from "./MovieListItem.jsx";

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        let fetchLink = "http://localhost:5000/api/movies";

        // Use URL search params directly
        const queryString = searchParams.toString();
        if (queryString) {
            fetchLink += `?${queryString}`;
        }

        fetch(fetchLink)
            .then(response => response.json())
            .then(data => {
                setMovies(data);
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    }, [searchParams])

    return (
        <>
            {movies.length > 0 ? movies.map((movie) => (
                <MovieListItem key={movie.id} movie={movie} />
            )) : (
                <p className="text-main">No movies found.</p>
            )}
        </>
    )
}

export default MovieList;
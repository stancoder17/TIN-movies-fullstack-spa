import {useEffect, useState} from "react";
import MovieListItem from "./MovieListItem.jsx";
import {Pagination, PageSelector} from "../common/Pagination.jsx";

function MovieList({searchParams, setSearchParams}) {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(Pagination.constraints.defaultPage);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        Pagination.init(searchParams, setSearchParams);

        fetch(`http://localhost:5000/api/movies?${searchParams.toString()}`)
            .then(response => response.json())
            .then(data => {
                setMovies(data.movies);
                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage);
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    }, [searchParams]);

    const handlePageSelect = (e) => {
        Pagination.changePage(e.target.value, searchParams, setSearchParams);
    }

    return (
        <>
            {movies && movies.length > 0 ? (
                <>
                    {movies.map((movie) => (
                        <MovieListItem key={movie.id} movie={movie} />
                    ))}
                    <PageSelector
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageSelect}
                    />
                </>
            ) : (
                <p className="text-main">No movies found.</p>
            )}
        </>
    )
}

export default MovieList;
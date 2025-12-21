import MovieList from "./MovieList.jsx";
import MoviesFilterFormBar from "./MoviesFilterFormBar.jsx";

function MoviesPage() {
    return (
        <main>
            <div className="sidebar sidebar-left">
                <h2 className="text-main">Filters</h2>
                <hr className="separator"/>

                <MoviesFilterFormBar />
            </div>

            <div className="main-content">
                <MovieList />
            </div>
        </main>
    );
}

export default MoviesPage;
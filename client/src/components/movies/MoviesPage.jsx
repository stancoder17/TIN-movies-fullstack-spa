import MovieList from "./MovieList.jsx";
import MoviesFilterFormBar from "./MoviesFilterFormBar.jsx";
import styles from './MoviesPage.module.css';

function MoviesPage() {
    return (
        <div className={styles.moviesPageWrapper}>
            <div className="sidebar sidebar-left">
                <h2 className="text-main">Filters</h2>
                <hr className="separator"/>

                <MoviesFilterFormBar />
            </div>

            <div className={`main-content ${styles.mainContent || ''}`.trim()}>
                <MovieList />
            </div>
        </div>
    );
}

export default MoviesPage;
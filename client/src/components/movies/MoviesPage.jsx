import MovieList from "./MovieList.jsx";
import MoviesFilterFormBar from "./MoviesFilterFormBar.jsx";
import styles from './MoviesPage.module.css';
import {useSearchParams} from "react-router-dom";

function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className={styles.moviesPageWrapper}>
            <div className="sidebar sidebar-left">
                <h2 className="text-main">Filters</h2>
                <hr className="separator"/>

                <MoviesFilterFormBar searchParams={searchParams} setSearchParams={setSearchParams}/>
            </div>

            <div className={`main-content ${styles.mainContent || ''}`.trim()}>
                <MovieList searchParams={searchParams} setSearchParams={setSearchParams} />
            </div>
        </div>
    );
}

export default MoviesPage;
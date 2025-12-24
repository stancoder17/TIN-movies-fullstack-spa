import MoviesPage from './components/movies/MoviesPage.jsx'
import MovieDetails from './components/movie-details/MovieDetails.jsx'
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './main.css';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="*" element={<h1 className='text-main'>404 Not Found</h1>} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App;

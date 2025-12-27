import MoviesPage from './components/movies/MoviesPage.jsx'
import MovieDetails from './components/movie-details/MovieDetails.jsx'
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './main.css';
import MovieCreateOrUpdate from "./components/movie-add/MovieAddOrEdit.jsx";
import UserList from "./components/users/UserList.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/add" element={<MovieCreateOrUpdate beingEdited={false} />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/movies/:id/edit" element={<MovieCreateOrUpdate beingEdited={true} />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="*" element={<h1 className='text-main'>404 Not Found</h1>} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App;

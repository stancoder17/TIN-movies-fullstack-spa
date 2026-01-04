import MoviesPage from './components/movies/MoviesPage.jsx'
import MovieDetails from './components/movie-details/MovieDetails.jsx'
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import './main.css';
import MovieCreateOrUpdate from "./components/movie-add/MovieAddOrEdit.jsx";
import UserList from "./components/users/UserList.jsx";
import UserDetails from "./components/user-details/UserDetails.jsx";
import Ratings from "./components/ratings/Ratings.jsx";
import Register from "./components/users/register/Register.jsx";
import {useState} from "react";

function App() {
    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <BrowserRouter>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/movies" replace />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/add" element={<MovieCreateOrUpdate beingEdited={false} />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/movies/:id/edit" element={<MovieCreateOrUpdate beingEdited={true} />} />
                    <Route path="/register" element={<Register setLoggedIn={setLoggedIn}/>} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:id" element={<UserDetails beingEdited={false} />} />
                    <Route path="/users/:id/edit" element={<UserDetails beingEdited={true} />} />
                    <Route path="/ratings" element={<Ratings />} />
                    <Route path="*" element={<h1 className='text-main'>404 Not Found</h1>} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App;

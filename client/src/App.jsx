import './main.css'
import MoviesPage from './components/movies/MoviesPage.jsx'
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/movies" element={<MoviesPage />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App;

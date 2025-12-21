import './main.css'
import MoviesPage from './components/MoviesPage.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MoviesPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;

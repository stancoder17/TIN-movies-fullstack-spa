import './main.css'
import MovieList from './components/MovieList.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MovieList />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;

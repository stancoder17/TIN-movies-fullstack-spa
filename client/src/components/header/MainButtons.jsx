import { Link } from 'react-router-dom';
import routes from "../../routes.js";

function MainButtons() {
    return (
        <div className="navbar-main-buttons">
            <img className="logo-img" src="https://www.pngall.com/wp-content/uploads/15/Film-Camera-PNG-Images.png" alt="logo"/>
            <Link className="text-main navbar-text-button" to={routes.allMovies}>ALL MOVIES</Link>
        </div>
    )
}

export default MainButtons;

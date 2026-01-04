import { Link } from 'react-router-dom';

function WelcomeUser({setLoggedIn}) {
    return (
        <div className="welcome-user">
            <h2 className="text-main">Welcome, admin</h2>
            <Link to="/users/1">
                <img className="user-avatar user-avatar-small" src="https://cdn.pfps.gg/pfps/9319-lego-star-wars-31.png" alt="User Menu"/>
            </Link>
            <Link to="/register" onClick={() => setLoggedIn(false)}>
                <h3 className="text-main-dark">LOG OUT</h3>
            </Link>
        </div>
    )
}

export default WelcomeUser;

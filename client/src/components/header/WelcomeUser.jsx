import { Link } from 'react-router-dom';

function WelcomeUser() {
    return (
        <div className="welcome-user">
            <h2 className="text-main">Welcome, (USERNAME)</h2>
            <Link to="/profile">
                <img className="user-avatar user-avatar-small" src="https://i.pinimg.com/736x/ab/75/6b/ab756b17690cc6303a1c718257265b02.jpg" alt="User Menu"/>
            </Link>
            <Link to="/login">
                <h3 className="text-main-dark">LOG OUT</h3>
            </Link>
        </div>
    )
}

export default WelcomeUser;

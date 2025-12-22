import MainButtons from './MainButtons.jsx';
import AdminButtons from './AdminButtons.jsx';
import WelcomeUser from './WelcomeUser.jsx';
import '../../main.css';

function Header() {
    return (
        <header>
            <div className="navbar">
                <MainButtons />

                <div className="user-panel">
                    <AdminButtons />
                    <WelcomeUser />
                </div>
            </div>
        </header>
    )
}

export default Header;

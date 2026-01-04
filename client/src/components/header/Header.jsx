import MainButtons from './MainButtons.jsx';
import AdminButtons from './AdminButtons.jsx';
import WelcomeUser from './WelcomeUser.jsx';
import {useState} from "react";

function Header({loggedIn, setLoggedIn}) {
    return (
        <header>
            <div className="navbar">
                <MainButtons />

                {loggedIn &&
                    <div className="user-panel">
                        <AdminButtons />
                        <WelcomeUser setLoggedIn={setLoggedIn} />
                    </div>
                }
            </div>
        </header>
    )
}

export default Header;

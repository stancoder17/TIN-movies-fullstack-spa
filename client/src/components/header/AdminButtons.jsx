import { Link } from 'react-router-dom';
import {useState} from "react";

function AdminButtons() {

    return (
        <div className="navbar-main-buttons">
            <Link className="text-main navbar-text-button" to="/users">USERS</Link>
            <Link className="text-main navbar-text-button" to="/ratings">RATINGS</Link>
            <Link className="text-main navbar-text-button" to="/movies/add">ADD MOVIE</Link>
        </div>
    )
}

export default AdminButtons;

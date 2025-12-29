import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import RatingsList from "../common/RatingsList.jsx";
import RatingListItem from "../common/RatingListItem.jsx";
import {formatDate} from "../../utils/formatUtils.js";

function UserDetails() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ratings, setRatings] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error(`Error fetching user details for ID ${id}:`, error));

        fetch(`http://localhost:5000/api/users/${id}/ratings`)
            .then(response => response.json())
            .then(data => setRatings(data))
            .catch(error => console.error(`Error fetching ratings for user ID ${id}:`, error));
    }, [id]);

    const handleUserDelete = async () => {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            navigate('/users');
        }
    }

    const handleRatingUpdate = async (ratingId, updatedRatingData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ratings/${ratingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRatingData)
            });

            if (response.ok) {
                setRatings(prevRatings => prevRatings.map(r =>
                    r.id === ratingId ? {...r, ...updatedRatingData} : r
                ));
            }
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };

    const handleRatingDelete = async (ratingId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ratings/${ratingId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setRatings(prevRatings => prevRatings.filter(r => r.id !== ratingId));
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    };

    return (
        <div className="main-content">
            {user && (
                <>
                    <div className="user-profile-header">
                        <img className="user-avatar user-avatar-big" src={user.profile_picture_url}
                             alt="user-profile-img"/>
                        <div className="user-profile-details">
                            <h1 className="text-main">{user.nickname}</h1>
                            <p className="text-accent">"{user.bio}"</p>
                            <div className="user-labels-and-values">
                                <div className="user-details-labels">
                                    <h3 className="text-main-dark">Email: </h3>
                                    <h3 className="text-main-dark">Date of birth: </h3>
                                    <h3 className="text-main-dark">Joined: </h3>
                                </div>
                                <div className="user-details-values">
                                    <h3 className="text-main">{user.email}</h3>
                                    <h3 className="text-main">{formatDate(user.date_of_birth)}</h3>
                                    <h3 className="text-main">{formatDate(user.date_of_joining)}</h3>
                                </div>
                            </div>

                            <div className="user-profile-buttons">
                                <button className="btn-blue" type="button" onClick={() => navigate(`/users/${id}/edit`)}>Edit profile
                                </button>
                                <button className="btn-red" type="button" onClick={handleUserDelete}>Delete account
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-main">Ratings</h1>
                        <hr className="separator separator-bright"/>
                        <RatingsList ratings={ratings} handleDelete={handleRatingDelete} handleUpdate={handleRatingUpdate} ItemComponent={RatingListItem} />
                    </div>
                </>
            )}
        </div>
    )
}

export default UserDetails;


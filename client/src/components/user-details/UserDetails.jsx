import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import RatingsList from "../common/RatingsList.jsx";
import RatingListItem from "../common/RatingListItem.jsx";
import {formatDate} from "../../utils/formatUtils.js";

function UserDetails({ beingEdited }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [fields, setFields] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error(`Error fetching user details for ID ${id}:`, error));

        if (!beingEdited) {
            fetch(`http://localhost:5000/api/users/${id}/ratings`)
                .then(response => response.json())
                .then(data => setRatings(data))
                .catch(error => console.error(`Error fetching ratings for user ID ${id}:`, error));
        } else {
            fetch('http://localhost:5000/api/users/update-form-fields')
                .then(response => response.json())
                .then(data => {
                    // Make fields available by 'name' property. Example: fields.nickname.label
                    const config = Object.fromEntries(data.map(field => [field.name, field]));
                    setFields(config);
                })
                .catch(error => console.error('Error fetching user form fields:', error));
        }
    }, [id, beingEdited]);

    const handleUserDelete = async () => {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            navigate('/users');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                navigate(`/users/${id}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/users/${id}`);
    };

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
                    {beingEdited && fields ? (
                        <form className="user-profile-header" onSubmit={handleSubmit}>
                            <div className="user-avatar-edit">
                                <img className="user-avatar user-avatar-big"
                                     src={user.profile_picture_url}
                                     alt="user-profile-img"/>
                                <label className="text-main-dark" htmlFor={fields.profile_picture_url.name}>Profile picture URL:</label>
                                <input
                                    type={fields.profile_picture_url.type}
                                    name={fields.profile_picture_url.name}
                                    id={fields.profile_picture_url.name}
                                    required={fields.profile_picture_url.required}
                                    min={fields.profile_picture_url.minLength}
                                    max={fields.profile_picture_url.maxLength}
                                    pattern={fields.profile_picture_url.pattern}
                                    defaultValue={user.profile_picture_url}
                                />
                            </div>
                            <div className="user-profile-details">
                                <h1>
                                    <input
                                        type={fields.nickname.type}
                                        name={fields.nickname.name}
                                        id={fields.nickname.name}
                                        required={fields.nickname.required}
                                        minLength={fields.nickname.minLength}
                                        maxLength={fields.nickname.maxLength}
                                        defaultValue={user.nickname}
                                    />
                                </h1>
                                <textarea
                                    name={fields.bio.name}
                                    id={fields.bio.name}
                                    placeholder={fields.bio.placeholder}
                                    required={fields.bio.required}
                                    minLength={fields.bio.minLength}
                                    maxLength={fields.bio.maxLength}
                                    defaultValue={user.bio}
                                />
                                <div className="user-labels-and-values">
                                    <div className="user-details-labels">
                                        <h3>
                                            <label className="text-main-dark" htmlFor={fields.email.name}>Email:</label>
                                        </h3>
                                        <h3>
                                            <label className="text-main-dark" htmlFor={fields.password.name}>Password:</label>
                                        </h3>
                                        <h3>
                                            <label className="text-main-dark" htmlFor={fields.date_of_birth.name}>Date of birth:</label>
                                        </h3>
                                    </div>
                                    <div className="user-details-values">
                                        <h3>
                                            <input
                                                type={fields.email.type}
                                                name={fields.email.name}
                                                id={fields.email.name}
                                                required={fields.email.required}
                                                minLength={fields.email.minLength}
                                                maxLength={fields.email.maxLength}
                                                pattern={fields.email.pattern}
                                                defaultValue={user.email}
                                            />
                                        </h3>
                                        <h3>
                                            <input
                                                autoComplete="new-password"
                                                type={fields.password.type}
                                                name={fields.password.name}
                                                id={fields.password.name}
                                                placeholder={fields.password.placeholder}
                                                required={fields.password.required}
                                                minLength={fields.password.minLength}
                                                maxLength={fields.password.maxLength}
                                            />
                                        </h3>
                                        <h3>
                                            <input
                                                type={fields.date_of_birth.type}
                                                name={fields.date_of_birth.name}
                                                id={fields.date_of_birth.name}
                                                defaultValue={user.date_of_birth}
                                            />
                                        </h3>
                                    </div>
                                </div>

                                <div className="user-profile-buttons">
                                    <button className="btn-blue" type="submit">Save</button>
                                    <button className="btn-red" type="button" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="user-profile-header">
                                <img className="user-avatar user-avatar-big" src={user.profile_picture_url}
                                     alt="user-profile-img"/>
                                <div className="user-profile-details">
                                    <h1 className="text-main">{user.nickname}</h1>
                                    {user.bio ?
                                        <p className="text-accent">"{user.bio}"</p>
                                        :
                                        <p className="text-accent">*No bio description*</p>
                                    }
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
                </>
            )}
        </div>
    )
}

export default UserDetails;


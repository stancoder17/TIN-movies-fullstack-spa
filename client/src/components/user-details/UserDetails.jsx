import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import RatingsList from "../common/RatingsList.jsx";
import RatingListItem from "../common/RatingListItem.jsx";
import {formatDate} from "../../utils/formatUtils.js";
import styles from './UserDetails.module.css';
import editStyles from './UserEdit.module.css';
import {
    validateNickname,
    validateEmail,
    validatePasswordUpdate,
    validateProfilePictureUrl,
    validateDateOfBirth,
    validateBio
} from '../../utils/UserValidation.js';

function UserDetails({ beingEdited }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [fields, setFields] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        password: '',
        profile_picture_url: '',
        date_of_birth: '',
        bio: ''
    });
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/users/${id}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        setUser(null);
                        return null;
                    }
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setUser(data);
                    if (beingEdited) {
                        setFormData({
                            nickname: data.nickname || '',
                            email: data.email || '',
                            password: '',
                            profile_picture_url: data.profile_picture_url || '',
                            date_of_birth: data.date_of_birth || '',
                            bio: data.bio || ''
                        });
                    }
                }
            })
            .catch(error => { console.error(`Error fetching user details for ID ${id}:`, error); });

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

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: validateField(name, value)});
    };

    const validateField = (fieldName, fieldValue) => {
        switch (fieldName) {
            case 'nickname':
                return validateNickname(fieldValue);
            case 'email':
                return validateEmail(fieldValue);
            case 'password':
                return validatePasswordUpdate(fieldValue);
            case 'profile_picture_url':
                return validateProfilePictureUrl(fieldValue);
            case 'date_of_birth':
                return validateDateOfBirth(fieldValue);
            case 'bio':
                return validateBio(fieldValue);
            default:
                return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                allErrors[key] = error;
            }
        });

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate(`/users/${id}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormData({
            nickname: '',
            email: '',
            password: '',
            profile_picture_url: '',
            date_of_birth: '',
            bio: ''
        });
        setErrors({});
        navigate(`/users/${id}`, { replace: true });
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
        <div className={styles.userDetailsWrapper}>
            <div className={`main-content ${styles.mainContent || ''}`.trim()}>
                {user ? (
                    <>
                        {beingEdited && fields ? (
                            <form className={`user-profile-header ${editStyles.userEditForm}`} noValidate onSubmit={handleSubmit}>
                                <div className="user-avatar-edit">
                                    <img className={`user-avatar user-avatar-big ${styles.userAvatarBig || ''}`.trim()}
                                         src={user.profile_picture_url}
                                         alt="user-profile-img"/>
                                    {errors.profile_picture_url && <span className="form-error-brighter">{errors.profile_picture_url}</span>}
                                    <input
                                        className={`${editStyles.userDetailsInput} ${editStyles.smallInput} ${editStyles.profileUrlInput}`.trim()}
                                        type={fields.profile_picture_url.type}
                                        name={fields.profile_picture_url.name}
                                        placeholder={fields.profile_picture_url.label}
                                        value={formData.profile_picture_url}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="user-profile-details">
                                    {errors.nickname && <span className="form-error-brighter">{errors.nickname}</span>}
                                    <input
                                        className={`${editStyles.userDetailsInput} ${editStyles.largeInput}`.trim()}
                                        type={fields.nickname.type}
                                        name={fields.nickname.name}
                                        placeholder={fields.nickname.label}
                                        value={formData.nickname}
                                        onChange={onChange}
                                    />
                                    {errors.bio && <span className="form-error-brighter">{errors.bio}</span>}
                                    <textarea
                                        name={fields.bio.name}
                                        id={fields.bio.name}
                                        placeholder={fields.bio.label}
                                        value={formData.bio}
                                        onChange={onChange}
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
                                            {errors.email && <span className="form-error-brighter">{errors.email}</span>}
                                            <input
                                                className={`${editStyles.userDetailsInput} ${editStyles.smallInput}`.trim()}
                                                type={fields.email.type}
                                                name={fields.email.name}
                                                id={fields.email.name}
                                                required={fields.email.required}
                                                minLength={fields.email.minLength}
                                                maxLength={fields.email.maxLength}
                                                pattern={fields.email.pattern}
                                                value={formData.email}
                                                onChange={onChange}
                                            />
                                            {errors.password && <span className="form-error-brighter">{errors.password}</span>}
                                            <input
                                                className={`${editStyles.userDetailsInput} ${editStyles.smallInput}`.trim()}
                                                autoComplete="new-password"
                                                type={fields.password.type}
                                                name={fields.password.name}
                                                id={fields.password.name}
                                                placeholder={fields.password.placeholder}
                                                required={fields.password.required}
                                                minLength={fields.password.minLength}
                                                maxLength={fields.password.maxLength}
                                                value={formData.password}
                                                onChange={onChange}
                                            />
                                            {errors.date_of_birth && <span className="form-error-brighter">{errors.date_of_birth}</span>}
                                            <input
                                                className={`${editStyles.userDetailsInput} ${editStyles.smallInput}`.trim()}
                                                type={fields.date_of_birth.type}
                                                name={fields.date_of_birth.name}
                                                id={fields.date_of_birth.name}
                                                value={formData.date_of_birth}
                                                onChange={onChange}
                                            />
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
                                    <img className={`user-avatar user-avatar-big ${styles.userAvatarBig || ''}`.trim()} src={user.profile_picture_url}
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

                                <div className="comments-section">
                                    <h1 className="text-main">Ratings</h1>
                                    <hr className="separator separator-bright"/>
                                    <RatingsList ratings={ratings} handleDelete={handleRatingDelete} handleUpdate={handleRatingUpdate} ItemComponent={RatingListItem} />
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <p className="text-main">404 not found.</p>
                )}
            </div>
        </div>
    )
}

export default UserDetails;


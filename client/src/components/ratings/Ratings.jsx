import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {formatDate, formatRatingScore} from "../../utils/formatUtils.js";
import styles from './Ratings.module.css';

function Ratings() {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/ratings')
            .then(response => response.json())
            .then(data => setRatings(data))
            .catch(error => console.error('Error fetching ratings:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ratings/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setRatings(prevRatings => prevRatings.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    };

    return (
        <div className={styles.ratingsPageWrapper}>
            <div className={`main-content ${styles.mainContent || ''}`.trim()}>
                <h1 className="text-main">Manage ratings</h1>
                <hr className="separator"/>

                {ratings.length > 0 ? (
                    <table className="users-table">
                        <thead>
                        <tr>
                            <th className="text-main">ID</th>
                            <th className="text-main">Production</th>
                            <th className="text-main">User</th>
                            <th className="text-main">Rate</th>
                            <th className="text-main">Comment</th>
                            <th className="text-main">Date</th>
                            <th className="text-main">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {ratings.map(rating => (
                                <tr key={rating.id}>
                                    <td className="text-main">{rating.id}</td>
                                    <td className="text-accent">
                                        <Link to={`/movies/${rating.movie_id}`} className="text-accent">{rating.title}</Link>
                                    </td>
                                    <td className="text-main">
                                        <Link to={`/users/${rating.user_id}`} className="text-accent">{rating.nickname}</Link>
                                    </td>
                                    <td className="text-main">{formatRatingScore(rating.score)}</td>
                                    <td className="text-main">
                                        {rating.comment}
                                    </td>
                                    <td className="text-main">{formatDate(rating.created_at)}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="table-btn btn-red"
                                                onClick={() => handleDelete(rating.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    ) : (
                        <p className="text-main">No ratings found.</p>
                    )}
        </div>
        </div>
    )
}

export default Ratings;
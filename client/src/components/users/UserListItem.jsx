import {Link} from "react-router-dom";
import {formatDate} from "../../utils/formatUtils.js";

function UserListItem({user, onDelete}) {
    const handleDeleteClick = () => {
        onDelete(user.id);
    };

    return (
        <tr>
            <td className="text-main">{user.id}</td>
            <td>
                <Link to={`/users/${user.id}`}>
                    <img
                        className="user-avatar"
                        src={user.profile_picture_url || '../images/user-avatar-example.jpg'}
                        alt="User avatar"
                    />
                </Link>
            </td>
            <td className="text-main">
                <Link to={`/users/${user.id}`} className="text-main">
                    {user.nickname}
                </Link>
            </td>
            <td className="text-accent">{user.email}</td>
            <td className="text-accent">{formatDate(user.date_of_birth)}</td>
            <td className="text-accent">{formatDate(user.date_of_joining)}</td>
            <td className="text-main">{user.ratingsCount || 0}</td>
            <td>
                <div className="action-buttons">
                    <Link to={`/users/${user.id}/edit`}>
                        <button type="button" className="table-btn btn-blue">Edit</button>
                    </Link>
                    <button type="button" className="table-btn btn-red" onClick={handleDeleteClick}>Delete</button>
                </div>
            </td>
        </tr>
    );
}

export default UserListItem;


import {useEffect, useState} from "react";
import UserListItem from "./UserListItem.jsx";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="main-content">
            <h1 className="text-main">Community Users</h1>
            <hr className="separator"/>

            {users.length > 0 ? (
            <table className="users-table">
                <thead>
                <tr>
                    <th className="text-main">ID</th>
                    <th className="text-main">Pfp</th>
                    <th className="text-main">Nickname</th>
                    <th className="text-main">Email</th>
                    <th className="text-main">Date of birth</th>
                    <th className="text-main">Joined</th>
                    <th className="text-main">No of ratings</th>
                    <th className="text-main">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <UserListItem key={user.id} user={user} onDelete={handleDelete} />
                ))}
                </tbody>
            </table>
            ) : (
                <p className="text-main">No users found.</p>
            )}
        </div>
    );
}

export default UserList;


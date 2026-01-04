import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import UserListItem from "./UserListItem.jsx";
import styles from './Users.module.css';
import {Pagination, PageSelector} from "../common/Pagination.jsx";

function UserList() {
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(Pagination.constraints.defaultPage);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Initialize pagination parameters if missing
        Pagination.init(searchParams, setSearchParams);

        fetch(`http://localhost:5000/api/users?${searchParams.toString()}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.users);
                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage);
            })
            .catch(error => console.error("Error fetching users:", error));
    }, [searchParams]);

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

    const handlePageSelect = (e) => {
        Pagination.changePage(e.target.value, searchParams, setSearchParams);
    };

    return (
        <div className={styles.userListPageWrapper}>
            <div className={`main-content ${styles.mainContent || ''}`.trim()}>
                <h1 className="text-main">Community Users</h1>
                <hr className="separator"/>

                {users.length > 0 ? (
                    <>
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
                        <PageSelector
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageSelect}
                        />
                    </>
                ) : (
                    <p className="text-main">No users found.</p>
                )}
            </div>
        </div>
    );
}

export default UserList;


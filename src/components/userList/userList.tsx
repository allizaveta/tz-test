import React, { useState } from "react";
import UserDetails from "../userDetails/userDetails";
interface User {
  id: number;
  login: string;
  html_url: string;
}
interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleClosePopUp = () => {
    setSelectedUser(null);
  };

  if (users.length === 0) {
    return <p>Пользователи не найдены.</p>;
  }

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserClick(user)}
            style={{ cursor: "pointer" }}
          >
            {user.login}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <UserDetails user={selectedUser} onClose={handleClosePopUp} />
      )}
    </>
  );
};

export default UserList;

import React, { useState } from "react";
import UserDetails from "../userDetails/userDetails";

interface UserListProps {
  users: any[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
  };

  const handleClosePopUp = () => {
    setSelectedUser(null);
  };
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

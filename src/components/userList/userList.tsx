import React from "react";

interface UserListProps {
  users: any[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.login}>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            {user.login}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UserList;

import React from "react";
import styles from "./UserDetails.module.css";
interface userDetailsProps {
  user: {
    login: string;
    public_repos?: number;
    html_url: string;
  } | null;
  onClose: () => void;
}

const UserDetails: React.FC<userDetailsProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className={styles.overlayStyle}>
      <div className={styles.popupStyle}>
        <h2>Информация о пользователе</h2>
        <p>
          Логин:{" "}
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            {user.login}
          </a>
        </p>
        <p>Количество репозиториев: {user.public_repos ?? 0}</p>
        <button className={styles.btn} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default UserDetails;

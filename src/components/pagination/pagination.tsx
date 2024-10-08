import React from "react";
import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  totalUsers: number;
  usersPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalUsers,
  usersPerPage,
}) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div>
      <div className={styles.container}>
        <button
          className={styles.btn}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Назад
        </button>
        <button
          disabled={currentPage === totalPages || totalUsers === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Вперед
        </button>
      </div>
      <p>
        Страница {currentPage} из {totalPages}
      </p>
    </div>
  );
};

export default Pagination;

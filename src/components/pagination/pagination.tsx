import React from "react";

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
      <button
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
      <div>
        Страница {currentPage} из {totalPages}
      </div>
    </div>
  );
};

export default Pagination;

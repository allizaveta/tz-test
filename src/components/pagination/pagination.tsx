import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Назад
      </button>
      <button onClick={() => onPageChange(currentPage + 1)}>Вперед</button>
    </div>
  );
};

export default Pagination;

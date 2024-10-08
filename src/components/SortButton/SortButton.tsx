import React from "react";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onSortChange: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ sortOrder, onSortChange }) => {
  return (
    <button onClick={onSortChange}>
      Сортировать по репозиториям (
      {sortOrder === "asc" ? "возрастание" : "убывание"})
    </button>
  );
};

export default SortButton;

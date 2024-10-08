import { useState, useEffect } from "react";
import { searchAndSortUsers } from "../../utils/api";
import { handleError } from "../../utils/errorHandler";
import SearchInput from "../SearchInput/SearchInput";
import SortButton from "../SortButton/SortButton";
import UserList from "../userList/userList";
import Pagination from "../pagination/pagination";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalUsers = 50;

  useEffect(() => {
    if (query) {
      fetchUsersData();
    }
  }, [query, sortOrder, currentPage]);

  const fetchUsersData = async () => {
    setLoading(true);
    setError(null);
    try {
      const sortedUsers = await searchAndSortUsers(
        query,
        currentPage,
        sortOrder
      );
      setUsers(sortedUsers);
    } catch (error) {
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchInput onSearch={setQuery} />
      <SortButton
        sortOrder={sortOrder}
        onSortChange={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      />
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      <UserList users={users} />
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalUsers={totalUsers}
        usersPerPage={usersPerPage}
      />
    </div>
  );
};

export default Search;

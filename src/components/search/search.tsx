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
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) {
      fetchUsersData();
    }
  }, [query, sortOrder, page]);

  const fetchUsersData = async () => {
    setLoading(true);
    setError(null);
    try {
      const sortedUsers = await searchAndSortUsers(query, page, sortOrder);
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
      <Pagination currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default Search;

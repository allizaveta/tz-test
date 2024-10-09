interface User {
  login: string;
  public_repos?: number;
}

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchUsers = async (query: string, page: number) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=100`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return {
    items: data.items,
    totalCount: data.total_count,
  };
};

export const fetchUserDetails = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const getUsersWithRepoCount = async (
  query: string
): Promise<{ users: User[]; totalCount: number }> => {
  const { items, totalCount } = await fetchUsers(query, 1);

  const usersWithDetails = await Promise.all(
    items.map(async (user: User) => {
      const userDetails = await fetchUserDetails(user.login);
      return {
        ...user,
        public_repos: userDetails.public_repos,
      };
    })
  );

  return { users: usersWithDetails, totalCount };
};

export const sortUsersByRepos = (
  users: User[],
  order: "asc" | "desc" = "asc"
): User[] => {
  return users.sort((a: User, b: User) => {
    return order === "asc"
      ? (a.public_repos || 0) - (b.public_repos || 0)
      : (b.public_repos || 0) - (a.public_repos || 0);
  });
};

export const searchAndSortUsers = async (
  query: string,
  page: number,
  order: "asc" | "desc" = "asc"
): Promise<{ users: User[]; totalCount: number }> => {
  try {
    const { users, totalCount } = await getUsersWithRepoCount(query);

    if (!Array.isArray(users)) {
      throw new Error("Ошибка: данные о пользователях не получены");
    }

    const sortedUsers = sortUsersByRepos(users, order);
    const startIndex = (page - 1) * 10;
    const paginatedUsers = sortedUsers.slice(startIndex, startIndex + 10);

    return { users: paginatedUsers, totalCount };
  } catch (error) {
    console.error("Ошибка при поиске и сортировке пользователей:", error);
    return { users: [], totalCount: 0 };
  }
};

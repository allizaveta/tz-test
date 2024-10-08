interface User {
  login: string;
  public_repos?: number;
}

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchUsers = async (query: string, page: number) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`,
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
  return data.items;
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
  query: string,
  page: number
): Promise<User[]> => {
  const users: User[] = await fetchUsers(query, page);
  const filteredUsers = users.filter((user) =>
    user.login.toLowerCase().startsWith(query.toLowerCase())
  );

  const usersWithDetails = await Promise.all(
    filteredUsers.map(async (user: User) => {
      const userDetails = await fetchUserDetails(user.login);
      return {
        ...user,
        public_repos: userDetails.public_repos,
      };
    })
  );

  return usersWithDetails;
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
): Promise<User[]> => {
  try {
    const usersWithRepos = await getUsersWithRepoCount(query, page);

    if (!Array.isArray(usersWithRepos)) {
      throw new Error("Ошибка: данные о пользователях не получены");
    }

    const sortedUsers = sortUsersByRepos(usersWithRepos, order);
    return sortedUsers;
  } catch (error) {
    console.error("Ошибка при поиске и сортировке пользователей:", error);
    return [];
  }
};

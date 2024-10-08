import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../components/userList/UserList";

describe("UserList", () => {
  const users = [
    { id: 1, login: "user1" },
    { id: 2, login: "user2" },
  ];

  it("renders a list of users", () => {
    const { getByText } = render(<UserList users={users} />);
    users.forEach((user) => {
      expect(getByText(user.login)).toBeInTheDocument();
    });
  });
});

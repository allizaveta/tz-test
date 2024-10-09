import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../components/userList/UserList";

interface UserDetailsProps {
  user: any; // Убедитесь, что user имеет необходимые свойства
  onClose: () => void;
}

// Мокаем компонент UserDetails
jest.mock("../components/userDetails/userDetails", () => {
  return jest.fn(({ user, onClose }: UserDetailsProps) => (
    <div>
      <h1>{user.login}</h1>
      <button onClick={onClose}>Close</button>
    </div>
  ));
});

describe("UserList", () => {
  const users = [
    { id: 1, login: "user1", html_url: "http://example.com/user1" },
    { id: 2, login: "user2", html_url: "http://example.com/user2" },
  ];

  it("renders a list of users", () => {
    const { getByText } = render(<UserList users={users} />);
    users.forEach((user) => {
      expect(getByText(user.login)).toBeInTheDocument();
    });
  });

  it("opens UserDetails popup when a user is clicked", () => {
    const UserDetails = require("../components/userDetails/userDetails");
    const { getByText } = render(<UserList users={users} />);

    fireEvent.click(getByText("user1"));

    expect(UserDetails).toHaveBeenCalledWith(
      expect.objectContaining({
        user: users[0], // Проверяем, что передается правильный пользователь
        onClose: expect.any(Function),
      }),
      {}
    );
  });

  it("closes UserDetails popup when the close function is called", () => {
    const UserDetails = require("../components/userDetails/userDetails");

    const { getByText, queryByText } = render(<UserList users={users} />);
    fireEvent.click(getByText("user1"));

    // Проверяем, что UserDetails был открыт
    expect(UserDetails).toHaveBeenCalled();

    fireEvent.click(getByText("Close"));

    // Проверяем, что UserDetails больше не отображается
    expect(queryByText("Close")).not.toBeInTheDocument();
  });
});

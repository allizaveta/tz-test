import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../components/userList/UserList";

interface UserDetailsProps {
  user: any;
  onClose: () => void;
}

jest.mock("../components/userDetails/userDetails", () => {
  return jest.fn(({ onClose }: UserDetailsProps) => (
    <div>
      <button onClick={onClose}>Close</button>
    </div>
  ));
});

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

  it("opens UserDetails popup when a user is clicked", () => {
    const { getByText } = render(<UserList users={users} />);
    fireEvent.click(getByText("user1"));
    expect(
      require("../components/userDetails/userDetails")
    ).toHaveBeenCalledWith(
      { user: users[0], onClose: expect.any(Function) },
      {}
    );
  });

  it("closes UserDetails popup when the close function is called", () => {
    const UserDetails = require("../components/userDetails/userDetails");

    const { getByText, queryByText } = render(<UserList users={users} />);
    fireEvent.click(getByText("user1"));
    expect(UserDetails).toHaveBeenCalled();
    fireEvent.click(getByText("Close"));
    expect(queryByText("Close")).not.toBeInTheDocument();
  });
});

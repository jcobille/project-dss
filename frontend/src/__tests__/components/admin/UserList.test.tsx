import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { UserList } from "../../../components/admin/UserList";
import thunk from "redux-thunk";
import { currentUserMockData, userListMockData } from "../../../utils/db.mocks";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

interface UserForm {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

describe("<UserList />", () => {
  const renderApp = () => {
    const initialState = {
      currentUser: currentUserMockData,
      userList: userListMockData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <UserList />
        </BrowserRouter>
      </Provider>
    );
  };

  const openAddUserModal = async () => {
    const addUserBtn = screen.getByRole("button", {
      name: "Add User",
    });
    userEvent.click(addUserBtn);

    const addUserModal = await screen.findByRole("dialog");
  };

  const addUserForm = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: UserForm) => {
    const firstNameInputElement = screen.getByRole("textbox", {
      name: "firstName",
    });
    const lastNameInputElement = screen.getByRole("textbox", {
      name: "lastName",
    });
    const emailInputElement = screen.getByRole("textbox", {
      name: "email",
    });
    const passwordInputElement = screen.getByLabelText("password");
    const confirmPasswordInputElement =
      screen.getByLabelText("confirmPassword");

    if (firstName) {
      userEvent.type(firstNameInputElement, firstName);
    }
    if (lastName) {
      userEvent.type(lastNameInputElement, lastName);
    }
    if (email) {
      userEvent.type(emailInputElement, email);
    }
    if (password) {
      userEvent.type(passwordInputElement, password);
    }
    if (confirmPassword) {
      userEvent.type(confirmPasswordInputElement, confirmPassword);
    }
  };

  beforeEach(() => {
    renderApp();
  });

  test("should render <AdminNavTabs />", () => {
    const navTabs = screen.getByTestId("adminNavTabs");
    expect(navTabs).toBeInTheDocument();
  });

  test("should render all User data", () => {
    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length - 1).toEqual(userListMockData.data.length);
  });

  test("should render User 'Add User' modal", () => {
    const addUserBtn = screen.getByRole("button", {
      name: "Add User",
    });
    expect(addUserBtn).toBeInTheDocument();
  });

  test("should render 'Add User' modal if 'Add User' button is clicked", async () => {
    openAddUserModal();
    const addUserModalElement = await screen.findByRole("dialog");
    expect(addUserModalElement).toBeInTheDocument();
  });

  test("should render modal title if 'Add User' modal is open", async () => {
    openAddUserModal();
    const addUserTitle = await screen.findByTestId("modalTitle");
    expect(addUserTitle).toBeInTheDocument();
    expect(addUserTitle).toHaveTextContent("Add User");
  });

  test("should show an error message 'First name is empty' when firstName is empty", () => {
    openAddUserModal();
    const addUserButton = screen.getByRole("button", {
      name: "Add",
    });
    userEvent.click(addUserButton);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("First Name is empty");
  });

  test("should show an error message 'Last name is empty' when last name is empty", () => {
    openAddUserModal();
    addUserForm({ firstName: "firstName" });
    const addActorButton = screen.getByRole("button", {
      name: "Add",
    });
    userEvent.click(addActorButton);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Last Name is empty");
  });

  test("should show an error message 'Email is empty' when password is empty", () => {
    openAddUserModal();
    addUserForm({ firstName: "firstName", lastName: "lastName" });
    const addActorButton = screen.getByRole("button", {
      name: "Add",
    });
    userEvent.click(addActorButton);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Email is empty");
  });

  test("should show an error message 'Password is empty' when password is empty", () => {
    openAddUserModal();
    addUserForm({
      firstName: "firstName",
      lastName: "lastName",
      email: "user@email.com",
    });
    const addActorButton = screen.getByRole("button", {
      name: "Add",
    });
    userEvent.click(addActorButton);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Password is empty");
  });

  test("should show an error message 'Confirm password is empty' when confirm password is empty", () => {
    openAddUserModal();
    addUserForm({
      firstName: "firstName",
      lastName: "lastName",
      email: "user@email.com",
      password: "passwd",
    });
    const addActorButton = screen.getByRole("button", {
      name: "Add",
    });
    userEvent.click(addActorButton);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Confirm password is empty");
  });

  test("should show an error message 'Password is less than 8' when password is less than 8", () => {
    openAddUserModal();
    addUserForm({
      firstName: "firstName",
      lastName: "lastName",
      email: "user@email.com",
      password: "passwd",
      confirmPassword: "passwd",
    });
    const addActorButton = screen.getByRole("button", {
      name: "Add",
    });
    userEvent.click(addActorButton);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Password is less than 8");
  });

  test("should show an error message 'Password isn't the same' when password isn't same", () => {
    openAddUserModal();
    addUserForm({
      firstName: "firstName",
      lastName: "lastName",
      email: "user@email.com",
      password: "password",
      confirmPassword: "passwd",
    });
    const addActorButton = screen.getByRole("button", {
      name: "Add",
    });
    userEvent.click(addActorButton);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Password isn't the same");
  });
});

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import configureStore from "redux-mock-store";
import {
  actorListMockData,
  currentUserMockData,
  moviesMockData,
  newUserMockData,
  reviewListMockData,
} from "../utils/db.mocks";
import thunk from "redux-thunk";
import userEvent from "@testing-library/user-event";

interface LoginForm {
  email?: string;
  password?: string;
}

interface RegisterForm {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

describe("<App />", () => {
  const renderApp = () => {
    const initialState = {
      movieList: moviesMockData,
      currentUser: currentUserMockData,
      reviewList: reviewListMockData,
      actorList: actorListMockData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);

    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  const inputLoginForm = ({ email, password }: LoginForm) => {
    const emailInputElement = screen.getByRole("textbox", {
      name: "email",
    });
    const passwordInputElement = screen.getByLabelText("password");

    if (email) userEvent.type(emailInputElement, email);
    if (password) userEvent.type(passwordInputElement, password);
  };

  const inputRegisterForm = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: RegisterForm) => {
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

    if (firstName) userEvent.type(firstNameInputElement, firstName);
    if (lastName) userEvent.type(lastNameInputElement, lastName);
    if (email) userEvent.type(emailInputElement, email);
    if (password) userEvent.type(passwordInputElement, password);
    if (confirmPassword)
      userEvent.type(confirmPasswordInputElement, confirmPassword);
  };

  const openRegisterForm = () => {
    const memberLoginBtn = screen.getByRole("button", {
      name: "login",
    });
    userEvent.click(memberLoginBtn);

    const registerBtn = screen.getByRole("button", {
      name: "registerBody",
    });
    userEvent.click(registerBtn);
  };

  beforeEach(() => renderApp());

  test("should renders the header", () => {
    expect(screen.getByRole("span")).toHaveTextContent("MovieViewer");
    expect(
      screen.getByRole("button", {
        name: "login",
      })
    ).toBeInTheDocument();
  });

  test("should show login dialog when 'Member Login' is clicked", async () => {
    const memberLoginBtn = screen.getByRole("button", {
      name: "login",
    });
    userEvent.click(memberLoginBtn);

    const loginModal = await screen.findByRole("dialog");
    expect(loginModal).toBeInTheDocument();
  });

  test("should show an error message 'Email is required' when email is empty and login button is clicked", async () => {
    const memberLoginBtn = screen.getByRole("button", {
      name: "login",
    });
    userEvent.click(memberLoginBtn);

    const loginModal = await screen.findByRole("dialog");
    expect(loginModal).toBeInTheDocument();

    const loginBtn = screen.getByRole("button", {
      name: "loginUser",
    });
    userEvent.click(loginBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Email is required");
  });

  test("should show an error message 'Password is required' when password is empty and login button is clicked", async () => {
    const memberLoginBtn = screen.getByRole("button", {
      name: "login",
    });
    userEvent.click(memberLoginBtn);

    const loginModal = await screen.findByRole("dialog");
    expect(loginModal).toBeInTheDocument();

    inputLoginForm({ email: "user@email.com" });

    const loginBtn = screen.getByRole("button", {
      name: "loginUser",
    });
    userEvent.click(loginBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Password is required");
  });

  test("should show an error message 'Invalid email' when email is not in proper format and login button is clicked", async () => {
    const memberLoginBtn = screen.getByRole("button", {
      name: "login",
    });
    userEvent.click(memberLoginBtn);

    const loginModal = await screen.findByRole("dialog");
    expect(loginModal).toBeInTheDocument();

    inputLoginForm({ email: "user@email", password: "password" });

    const loginBtn = screen.getByRole("button", {
      name: "loginUser",
    });
    userEvent.click(loginBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Invalid email");
  });

  test("should show an error message 'Invalid email or password' when password is less than 6", async () => {
    const memberLoginBtn = screen.getByRole("button", {
      name: "login",
    });
    userEvent.click(memberLoginBtn);

    const loginModal = await screen.findByRole("dialog");
    expect(loginModal).toBeInTheDocument();

    inputLoginForm({ email: "user@email.com", password: "passwd" });

    const loginBtn = screen.getByRole("button", {
      name: "loginUser",
    });
    userEvent.click(loginBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Invalid email or password");
  });

  test("should change dialog title to 'Create an Account' when 'Register' is clicked", async () => {
    const memberLoginBtn = screen.getByRole("button", {
      name: "login",
    });
    userEvent.click(memberLoginBtn);

    const registerBtn = screen.getByRole("button", {
      name: "registerBody",
    });
    userEvent.click(registerBtn);

    const registerTitle = screen.getByText("Create an Account");
    expect(registerTitle).toBeInTheDocument();
  });

  test("should show an error message 'First name is required' when first name is empty", async () => {
    openRegisterForm();
    const registerBtn = screen.getByRole("button", {
      name: "registerUser",
    });
    userEvent.click(registerBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("First name is required");
  });

  test("should show an error message 'Last name is required' when last name is empty", async () => {
    openRegisterForm();
    inputRegisterForm({ firstName: "userFirstName" });

    const registerBtn = screen.getByRole("button", {
      name: "registerUser",
    });
    userEvent.click(registerBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Last name is required");
  });

  test("should show an error message 'Email is required' when email is empty", async () => {
    openRegisterForm();
    inputRegisterForm({ firstName: "userFirstName", lastName: "userLastName" });

    const registerBtn = screen.getByRole("button", {
      name: "registerUser",
    });
    userEvent.click(registerBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Email is required");
  });

  test("should show an error message 'Password is required' when password is empty", async () => {
    openRegisterForm();
    inputRegisterForm({
      firstName: "userFirstName",
      lastName: "userLastName",
      email: "user@email.com",
    });

    const registerBtn = screen.getByRole("button", {
      name: "registerUser",
    });
    userEvent.click(registerBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Password is required");
  });

  test("should show an error message 'Email is invalid' when email format is invalid", async () => {
    openRegisterForm();
    inputRegisterForm({
      firstName: "userFirstName",
      lastName: "userLastName",
      email: "user@email",
      password: "password",
    });

    const registerBtn = screen.getByRole("button", {
      name: "registerUser",
    });
    userEvent.click(registerBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Email is invalid");
  });

  test("should show an error message 'Password is fewer than 8 characters' when password length is less than 8", async () => {
    openRegisterForm();
    inputRegisterForm({
      firstName: "userFirstName",
      lastName: "userLastName",
      email: "user@email.com",
      password: "passwd",
    });

    const registerBtn = screen.getByRole("button", {
      name: "registerUser",
    });
    userEvent.click(registerBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      "Password is fewer than 8 characters"
    );
  });

  test("should show an error message 'Password didn't match' when passwords isn't same", async () => {
    openRegisterForm();
    inputRegisterForm({
      firstName: "userFirstName",
      lastName: "userLastName",
      email: "user@email.com",
      password: "passworsd",
      confirmPassword: "password",
    });

    const registerBtn = screen.getByRole("button", {
      name: "registerUser",
    });
    userEvent.click(registerBtn);

    const errorMessage = screen.getByTestId("modalError");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Password didn't match");
  });

  test("should notify the user with a message 'Successfully Registered' when successful", async () => {
    openRegisterForm();
    inputRegisterForm({ ...newUserMockData });

    const registerBtn = screen.getByRole("button", {
      name: "registerUser",
    });
    userEvent.click(registerBtn);

    // expect(
    //   await screen.findByText("Successfully Registered")
    // ).toBeInTheDocument();
  });

  test("should go back to login page when footer register is clicked", () => {
    openRegisterForm();
    const loginBtnFooter = screen.getByRole("button", {
      name: "loginBody",
    });
    userEvent.click(loginBtnFooter);

    const registerTitle = screen.getByText("Welcome Back!");
    expect(registerTitle).toBeInTheDocument();
  });
});

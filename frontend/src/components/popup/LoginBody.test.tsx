import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { LoginBody } from "./LoginBody";
import { BodyProps } from "../types/ActionTypes";

function renderLoginForm(props: Partial<BodyProps> = {}) {
  const defaultProps: BodyProps = {
    type: "login",

    changeModal() {
      return;
    },

    closeModal() {
      return;
    },
  };
  return render(<LoginBody {...defaultProps} {...props} />);
}

describe("<LoginForm />", () => {
  test("should display a blank login form", async () => {
    const { findByTestId } = renderLoginForm();
    const LoginForm = await findByTestId("login-form"); // find elements by their data-testid

    expect(LoginForm).toHaveFormValues({
      username: "",
      password: "",
      remember: true,
    });
  });
});

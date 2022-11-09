import React from "react";
import { render } from "@testing-library/react";
import { LoginBody } from "./LoginBody";
import { ModalProps } from "../types/ActionTypes";

function renderLoginForm(props: Partial<ModalProps> = {}) {
  const defaultProps: ModalProps = {
    type: "login",
    setModalProps: (newType: string, newAction?: string, id?: string) => {
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

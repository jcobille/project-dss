import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { BodyProps } from "../types/ActionTypes";
import {
  AutoComplete,
  CustomAutocompleteProps,
  CustomInput,
  CustomInputProps,
  CustomTextArea,
  CustomTextareaProps,
} from "./CustomInput";

function renderCustomInput(props: Partial<CustomInputProps> = {}) {
  const defaultProps: CustomInputProps = {
    type: "",
    name: "",
    className: "input",
    placeHolder: "",
    hidden: false,
    value: "",
    changeHandler() {
      return;
    },
  };
  return render(<CustomInput {...defaultProps} {...props} />);
}

describe("<CustomInput />", () => {
  test("should display a text input with an email placeholder", async () => {
    const { findByTestId } = renderCustomInput({
      type: "text",
      name: "email",
      placeHolder: "Email",
    });
    const CustomInput = await findByTestId("email");
    const placeholder = "Email";
    expect(CustomInput).toHaveAttribute("placeholder", placeholder);
  });

  test("should allow entering an email", async () => {
    function changeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
      expect(evt.target.value).toEqual("test@email.com");
    }

    const { findByTestId } = renderCustomInput({
      type: "text",
      name: "email",
      changeHandler,
    });
    const CustomInput = await findByTestId("email");

    fireEvent.change(CustomInput, { target: { value: "test@email.com" } });
  });

  test("expects to be hidden", async () => {
    const { findByTestId } = renderCustomInput({
      type: "text",
      name: "hidden",
      hidden: true,
    });
    const CustomInput = await findByTestId("hidden");
    expect(CustomInput).not.toBeVisible();
  });
});

function renderCustomTextArea(props: Partial<CustomTextareaProps> = {}) {
  const defaultProps: CustomTextareaProps = {
    name: "",
    className: "input",
    placeHolder: "",
    hidden: false,
    value: "",
    changeHandler() {
      return;
    },
  };
  return render(<CustomTextArea {...defaultProps} {...props} />);
}

describe("<CustomTextArea />", () => {
  test("should display a textarea with a 'description' placeholder", async () => {
    const { findByTestId } = renderCustomTextArea({
      name: "description",
      placeHolder: "Description",
    });
    const CustomTextArea = await findByTestId("description");
    const placeholder = "Description";
    expect(CustomTextArea).toHaveAttribute("placeholder", placeholder);
  });

  test("should allow entering a value equal to 'this is a sample description'", async () => {
    function changeHandler(evt: React.ChangeEvent<HTMLTextAreaElement>) {
      expect(evt.target.value).toEqual("this is a sample description");
    }

    const { findByTestId } = renderCustomTextArea({
      name: "textAreaName",
      changeHandler,
    });
    const CustomTextArea = await findByTestId("textAreaName");

    fireEvent.change(CustomTextArea, {
      target: { value: "this is a sample description" },
    });
  });

  test("expects to be hidden", async () => {
    const { findByTestId } = renderCustomTextArea({
      name: "hiddenTextArea",
      hidden: true,
    });
    const CustomInput = await findByTestId("hiddenTextArea");
    expect(CustomInput).not.toBeVisible();
  });
});

function renderAutoComplete(props: Partial<CustomAutocompleteProps> = {}) {
  const defaultProps: CustomAutocompleteProps = {
    name: "",
    className: "input",
    placeHolder: "",
    hidden: false,
    value: "",
    changeHandler() {
      return;
    },
  };
  return render(<AutoComplete {...defaultProps} {...props} />);
}

describe("<AutoComplete />", () => {
  test("should display an autocomplete with an 'Enter keywords ...' placeholder", async () => {
    const { findByTestId } = renderAutoComplete({
      name: "search",
      placeHolder: "Enter keywords ...",
    });
    const AutoComplete = await findByTestId("search");
    const placeholder = "Enter keywords ...";
    expect(AutoComplete).toHaveAttribute("placeholder", placeholder);
  });
});

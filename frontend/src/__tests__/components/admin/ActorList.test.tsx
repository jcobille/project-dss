import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ActorList } from "../../../components/admin/ActorList";
import thunk from "redux-thunk";
import {
  actorListMockData,
  currentUserMockData,
} from "../../../utils/db.mocks";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

interface ActorForm {
  firstName?: string;
  lastName?: string;
  gender?: string;
  age?: string;
  image?: string;
}
describe("<ActorList />", () => {
  const renderApp = () => {
    const initialState = {
      currentUser: currentUserMockData,
      actorList: actorListMockData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ActorList />
        </BrowserRouter>
      </Provider>
    );
  };

  const openAddActorModal = async () => {
    const addActorBtn = screen.getByRole("button", {
      name: "Add Actor",
    });
    userEvent.click(addActorBtn);

    const addActorModal = await screen.findByRole("dialog");
    await waitFor(() => {
      expect(addActorModal).toBeInTheDocument();
    });
    expect(addActorModal).toHaveTextContent("Add Actor");
  };

  const addActorForm = ({
    firstName,
    lastName,
    gender,
    age,
    image,
  }: ActorForm) => {
    const firstNameInputElement = screen.getByRole("textbox", {
      name: "firstName",
    });
    const lastNameInputElement = screen.getByRole("textbox", {
      name: "lastName",
    });
    const ageInputElement = screen.getByRole("textbox", {
      name: "age",
    });
    const imageInputElement = screen.getByRole("textbox", {
      name: "image",
    });

    if (firstName) {
      userEvent.type(firstNameInputElement, firstName);
    }
    if (lastName) {
      userEvent.type(lastNameInputElement, lastName);
    }
    if (gender) {
      const genderRadioElement = screen.getByLabelText(gender);
      userEvent.click(genderRadioElement);
    }
    if (age) {
      userEvent.type(ageInputElement, age);
    }
    if (image) {
      userEvent.type(imageInputElement, image);
    }
  };

  beforeEach(() => renderApp());

  test("should render <AdminNavTabs />", () => {
    const navTabs = screen.getByTestId("adminNavTabs");
    expect(navTabs).toBeInTheDocument();
  });

  test("should render all actor data", () => {
    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length - 1).toEqual(actorListMockData.actors.length);
  });

  test("should render actor 'Add Actor' modal", () => {
    const addActorBtn = screen.getByRole("button", {
      name: "Add Actor",
    });
    expect(addActorBtn).toBeInTheDocument();
  });
  describe("Add actor modal", () => {
    test("should render 'Add Actor' modal if 'Add Actor' is clicked", async () => {
      openAddActorModal();
      const addActorModalElement = await screen.findByRole("dialog");
      expect(addActorModalElement).toBeInTheDocument();
    });

    test("should render modal title if 'Add Actor' modal is open", async () => {
      openAddActorModal();
      const addActorTitle = await screen.findByTestId("modalTitle");
      expect(addActorTitle).toBeInTheDocument();
      expect(addActorTitle).toHaveTextContent("Add Actor");
    });

    test("should show an error message 'First name is empty' when firstName is empty", () => {
      openAddActorModal();
      const addActorButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addActorButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("First name is empty");
    });

    test("should show an error message 'Last name is empty' when last name is empty", () => {
      openAddActorModal();
      addActorForm({ firstName: "firstName" });
      const addActorButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addActorButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Last Name is empty");
    });

    test("should show an error message 'Gender is required' when gender is not selected", () => {
      openAddActorModal();
      addActorForm({ firstName: "firstName", lastName: "lastName" });
      const addActorButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addActorButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Gender is required");
    });

    test("should show an error message 'Age is empty' when age is empty", () => {
      openAddActorModal();
      addActorForm({
        firstName: "firstName",
        lastName: "lastName",
        gender: "Male",
      });
      const addActorButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addActorButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Age is empty");
    });

    test("should show an error message 'Image is empty' when image is empty", () => {
      openAddActorModal();
      addActorForm({
        firstName: "firstName",
        lastName: "lastName",
        gender: "Male",
        age: "30",
      });
      const addActorButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addActorButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Image is empty");
    });

    test("should render 'Delete Actor' modal when the button is not disabled", async () => {
      const deleteActorBtn = screen.getAllByTestId("deleteBtn");
      expect(deleteActorBtn[1]).not.toBeDisabled();
      userEvent.click(deleteActorBtn[1]);

      const deleteActorModal = await screen.findByRole("dialog");
      expect(deleteActorModal).toBeInTheDocument();
    });

    test("should notify the user with a message 'Actor has been deleted' when successful", async () => {
      const deleteActorBtn = screen.getAllByTestId("deleteBtn");
      expect(deleteActorBtn[1]).not.toBeDisabled();
      userEvent.click(deleteActorBtn[1]);

      const deleteActorConfirm = screen.getByRole("button", {
        name: "Delete",
      });
      userEvent.click(deleteActorConfirm);

      expect(
        await screen.findByText("Actor has been deleted")
      ).toBeInTheDocument();
    });
  });
});

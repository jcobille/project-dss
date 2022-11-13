import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { UserList } from "../../../components/admin/UserList";
import thunk from "redux-thunk";
import { currentUserMockData, userListMockData } from "../../../utils/db.mocks";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
    await waitFor(() => {
      expect(addUserModal).toBeInTheDocument();
    });
    expect(addUserModal).toHaveTextContent("Add User");
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

  test("should render 'Add User' modal if 'Add Movie' is clicked", async () => {
    openAddUserModal();
  });
});

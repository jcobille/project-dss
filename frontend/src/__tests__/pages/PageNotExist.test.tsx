import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { PageNotExist } from "../../pages/PageNotExist";

describe("<PageNotExist />", () => {
  const renderApp = () => {
    Object.defineProperty(window, "location", {
      value: {
        id: "invalidpage",
      },
    });
    const initialState = {};

    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <PageNotExist />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    renderApp();
  });
  it("should render invalid page", () => {
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you are looking for doesn't exist or an error occurred."
      )
    ).toBeInTheDocument();
  });
});

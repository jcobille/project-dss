import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import { store } from "../../utils/store";

describe("<HomePage />", () => {
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("renders the Home page", () => {
    expect(screen.getByText("Find Movies, TV shows and more")).not.toBeNull();
  });

  test("should render the search input", () => {
    const searchInputElement = screen.getByRole("textbox", { name: /search/i });
    expect(searchInputElement).toBeInTheDocument();
  });
});

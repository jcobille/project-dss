import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../utils/store";
import DetailsPage from "../../pages/DetailsPage";

describe("<DetailsPage />", () => {
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <Router>
          <DetailsPage />
        </Router>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("Renders movie details page", () => {
    // expect(screen.getByText("Released:")).not.toBeNull();
  });
});

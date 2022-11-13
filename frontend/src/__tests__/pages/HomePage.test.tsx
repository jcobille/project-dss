import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import HomePage from "../../pages/HomePage";
import configureStore from "redux-mock-store";

import {
  actorListMockData,
  currentUserMockData,
  moviesMockData,
  reviewListMockData,
} from "../../utils/db.mocks";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<HomePage />", () => {
  const initialState = {
    movieList: moviesMockData,
    currentUser: currentUserMockData,
    reviewList: reviewListMockData,
    actorList: actorListMockData,
  };
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState);
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("renders the Home page", () => {
    expect(screen.getByText("Find Movies, TV shows and more")).not.toBeNull();
  });

  test("should render the search input", () => {
    const searchInputElement = screen.getByTestId(/searchBox/);
    expect(searchInputElement).toBeInTheDocument();
  });

  test("should show movie selection when valid input is entered", () => {
    const searchInputElement = screen.getByTestId(/searchBox/);
    userEvent.type(searchInputElement, "bl");

    const selectionElement = screen.getAllByTestId(/dataSelection/);
    expect(selectionElement.length).toBe(2);
  });

  test("should render the <MovieContainer> inside the div", () => {
    const movieContainer = screen.getByTestId("movieContainer");
    const movieCard = screen.getAllByTestId("movieCell");

    expect(movieContainer).toContainElement(movieCard[0]);
    expect(movieCard.length).toBe(3);
  });

  test("should show movie details when hovered in", () => {
    const movie = screen.getAllByTestId("movieCardTrigger");
    let details = screen.queryAllByTestId("movieDetailsExpected");

    expect(details[0]).toBeUndefined();
    userEvent.hover(movie[0]);

    details = screen.queryAllByTestId("movieDetailsExpected");
    expect(details[0]).toBeInTheDocument();
  });

  test("should hide movie details when hovered out", () => {
    const movie = screen.getAllByTestId("movieCardTrigger");
    let details = screen.queryAllByTestId("movieDetailsExpected");

    expect(details[0]).toBeUndefined();
    userEvent.hover(movie[0]);

    details = screen.queryAllByTestId("movieDetailsExpected");
    expect(details[0]).toBeInTheDocument();

    userEvent.unhover(movie[0]);
    details = screen.queryAllByTestId("movieDetailsExpected");

    expect(details[0]).toBeUndefined();
  });
});

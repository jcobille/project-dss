import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MovieDetailsPage from "../../pages/MovieDetailsPage";
import thunk from "redux-thunk";
import {
  currentUserMockData,
  moviesMockData,
  reviewListMockData,
} from "../../utils/db.mocks";

describe("<MovieDetailsPage />", () => {
  const renderApp = () => {
    const initialState = {
      movieList: moviesMockData,
      currentUser: currentUserMockData,
      reviewList: reviewListMockData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <MovieDetailsPage />
      </Provider>
    );
  };

  beforeEach(() => {
    renderApp();
  });

  test("should render movie image", () => {
    const movieImg = screen.getByRole("img");
    expect(movieImg).toHaveAttribute(
      "src",
      "https://img.xmovies8.fun/xxrz/250x400/100/15/1b/151b961f5343bebb7f434f3060079d97/151b961f5343bebb7f434f3060079d97.jpg"
    );
    expect(movieImg).toHaveAttribute("alt", "Black Adam");
    expect(movieImg).toBeInTheDocument();
  });

  test("should render movie title", () => {
    expect(screen.getByTestId("title").textContent).toEqual(
      moviesMockData.details.title
    );
  });

  test("should render movie released date", () => {
    expect(screen.getByTestId("releasedDate").textContent).toEqual(
      moviesMockData.details.releasedDate
    );
  });

  test("should render movie Duration", () => {
    expect(screen.getByTestId("duration").textContent).toEqual(
      moviesMockData.details.duration + "m"
    );
  });

  test("should render movie cost", () => {
    expect(screen.getByTestId("cost").textContent).toEqual(
      moviesMockData.details.cost
    );
  });

  test("should render first review", () => {
    const reviewerName = screen.getAllByTestId("reviewerName");
    const firstName = reviewListMockData.data[0].user.firstName;
    const lastName = reviewListMockData.data[0].user.lastName;
    expect(reviewerName[0].textContent).toEqual(firstName + " " + lastName);
  });
});

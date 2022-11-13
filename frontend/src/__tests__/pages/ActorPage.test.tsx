import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  currentUserMockData,
  actorListMockData,
  moviesMockData,
} from "../../utils/db.mocks";
import ActorPage from "../../pages/ActorPage";
import { BrowserRouter } from "react-router-dom";

describe("<ActorPage />", () => {
  const renderApp = () => {
    Object.defineProperty(window, "location", {
      value: {
        id: actorListMockData.selectedActor.id,
      },
    });
    const initialState = {
      currentUser: currentUserMockData,
      actorList: actorListMockData,
      movieList: moviesMockData,
    };

    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ActorPage />
        </BrowserRouter>
      </Provider>
    );
  };

  const actorName =
    actorListMockData.selectedActor.firstName +
    " " +
    actorListMockData.selectedActor.lastName;

  beforeEach(() => {
    renderApp();
  });

  test("should render actor image", () => {
    const actorImg = screen.getByTestId("actorImg");
    expect(actorImg).toHaveAttribute(
      "src",
      actorListMockData.selectedActor.image
    );
    expect(actorImg).toHaveAttribute("alt", actorName);
    expect(actorImg).toBeInTheDocument();
  });

  test("should render actor's name", () => {
    const actorName =
      actorListMockData.selectedActor.firstName +
      " " +
      actorListMockData.selectedActor.lastName;
    expect(screen.getByTestId("actorName").textContent).toEqual(actorName);
  });

  test("should render actor's age", () => {
    expect(screen.getByTestId("actorAge").textContent).toEqual(
      `${actorListMockData.selectedActor.age}`
    );
  });

  test("should render actor's gender", () => {
    expect(screen.getByTestId("actorGender").textContent).toEqual(
      actorListMockData.selectedActor.gender
    );
  });

  test("should render actor title movie list", () => {
    expect(screen.getByTestId("actorMoviesTitle").textContent).toEqual(
      `${actorName}'s Movies`
    );
  });

  test("should render actors movie list", () => {
    const movieContainer = screen.getByTestId("movieContainer");
    const movieCard = screen.getAllByTestId("movieCell");

    expect(movieContainer).toContainElement(movieCard[0]);
    expect(movieCard.length).toBe(1);
  });
});

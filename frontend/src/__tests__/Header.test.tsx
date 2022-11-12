import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import configureStore from "redux-mock-store";
import {
  actorListMockData,
  currentUserMockData,
  moviesMockData,
  reviewListMockData,
} from "../utils/db.mocks";
import thunk from "redux-thunk";

describe("<App />", () => {
  const renderApp = () => {
    const initialState = {
      movieList: moviesMockData,
      currentUser: currentUserMockData,
      reviewList: reviewListMockData,
      actorList: actorListMockData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);

    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };
  
  beforeEach(() => renderApp());
  
  test("renders the Header", () => {
    expect(screen.getByText("Find Movies, TV shows and more")).not.toBeNull();
  });
});

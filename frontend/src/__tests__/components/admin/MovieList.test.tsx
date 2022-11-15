import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MovieList } from "../../../components/admin/MovieList";
import thunk from "redux-thunk";
import {
  actorListMockData,
  currentUserMockData,
  moviesMockData,
  newMovieMockData,
} from "../../../utils/db.mocks";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { editMovie } from "../../../features/movieSlice";

interface MovieForm {
  title?: string;
  releasedDate?: string;
  duration?: number;
  image?: string;
  cost?: string;
  description?: string;
}
describe("<MovieList />", () => {
  const renderApp = () => {
    const initialState = {
      currentUser: currentUserMockData,
      movieList: moviesMockData,
      actorList: actorListMockData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieList />
        </BrowserRouter>
      </Provider>
    );
  };

  const openAddMovieModal = async () => {
    const addMovieBtn = screen.getByRole("button", {
      name: "Add Movie",
    });
    userEvent.click(addMovieBtn);

    const addMovieModal = await screen.findByRole("dialog");
    await waitFor(() => {
      expect(addMovieModal).toBeInTheDocument();
    });
  };

  const openEditMovieModal = async () => {
    const editMovieBtn = screen.getAllByTestId("editBtn");
    userEvent.click(editMovieBtn[0]);

    const editMovieModal = await screen.findByRole("dialog");
    await waitFor(() => {
      expect(editMovieModal).toBeInTheDocument();
    });
  };

  const addMovieForm = ({
    title,
    releasedDate,
    duration,
    image,
    cost,
    description,
  }: MovieForm) => {
    const titleInputElement = screen.getByRole("textbox", {
      name: "title",
    });
    const releasedDateInputElement = screen.getByRole("textbox", {
      name: "releasedDate",
    });
    const durationInputElement = screen.getByRole("textbox", {
      name: "duration",
    });
    const imageInputElement = screen.getByRole("textbox", {
      name: "image",
    });
    const costInputElement = screen.getByRole("textbox", {
      name: "cost",
    });
    const descriptionInputElement = screen.getByRole("textbox", {
      name: "description",
    });

    if (title) {
      userEvent.type(titleInputElement, title);
    }
    if (releasedDate) {
      userEvent.type(releasedDateInputElement, releasedDate);
    }
    if (duration) {
      userEvent.type(durationInputElement, `${duration}`);
    }
    if (image) {
      userEvent.type(imageInputElement, image);
    }
    if (cost) {
      userEvent.type(costInputElement, cost);
    }
    if (description) {
      userEvent.type(descriptionInputElement, description);
    }
  };

  const editMovieForm = async ({ image, cost, description }: MovieForm) => {
    const imageInputElement = await screen.getByRole("textbox", {
      name: "image",
    });
    expect(imageInputElement).toHaveDisplayValue(
      moviesMockData.movies[0].image
    );

    const costInputElement = screen.getByRole("textbox", {
      name: "cost",
    });
    expect(costInputElement).toHaveDisplayValue(moviesMockData.movies[0].cost);

    const descriptionInputElement = screen.getByRole("textbox", {
      name: "description",
    });
    expect(descriptionInputElement).toHaveDisplayValue(
      moviesMockData.movies[0].description
    );

    if (!image) {
      userEvent.clear(imageInputElement);
    }
    if (!cost) {
      userEvent.clear(costInputElement);
    }
    if (!description) {
      userEvent.clear(descriptionInputElement);
    }
  };

  beforeEach(() => {
    renderApp();
  });

  test("should render <AdminNavTabs />", () => {
    const navTabs = screen.getByTestId("adminNavTabs");
    expect(navTabs).toBeInTheDocument();
  });

  test("should render all movie data", () => {
    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length - 1).toEqual(moviesMockData.movies.length);
  });

  test("should render 'Add Movie' button", () => {
    const addMovieBtn = screen.getByRole("button", {
      name: "Add Movie",
    });
    expect(addMovieBtn).toBeInTheDocument();
  });
  
  describe("Add movie modal", () => {
    test("should render 'Add Movie' modal if 'Add Movie' button is clicked", async () => {
      openAddMovieModal();
      const addMovieModalElement = await screen.findByRole("dialog");
      expect(addMovieModalElement).toBeInTheDocument();
    });

    test("should render modal title if 'Add Movie' modal is open", async () => {
      openAddMovieModal();
      const addMovieTitle = await screen.findByTestId("modalTitle");
      expect(addMovieTitle).toBeInTheDocument();
      expect(addMovieTitle).toHaveTextContent("Add Movie");
    });

    test("should show an error message 'Title is empty' when title is empty", () => {
      openAddMovieModal();
      const addMovieButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addMovieButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Title is empty");
    });

    test("should show an error message 'Released date is empty' when released date is empty", () => {
      openAddMovieModal();
      addMovieForm({ title: "Title" });
      const addMovieButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addMovieButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Released date is empty");
    });

    test("should show an error message 'Duration is empty' when duration is empty", () => {
      openAddMovieModal();
      addMovieForm({ title: "Title", releasedDate: "2022-01-01" });
      const addMovieButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addMovieButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Duration is empty");
    });

    test("should show an error message 'Image is empty' when image is empty", () => {
      openAddMovieModal();
      addMovieForm({
        title: "Title",
        releasedDate: "2022-01-01",
        duration: 100,
      });

      const addMovieButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addMovieButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Image is empty");
    });

    test("should show an error message 'Cost is empty' when cost is empty", () => {
      openAddMovieModal();
      addMovieForm({
        title: "Title",
        releasedDate: "2022-01-01",
        duration: 100,
        image:
          "https://img.xmovies8.fun/xxrz/250x400/100/15/1b/151b961f5343bebb7f434f3060079d97/151b961f5343bebb7f434f3060079d97.jpg",
      });

      const addMovieButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addMovieButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Cost is empty");
    });

    test("should show an error message 'Description is empty' when description is empty", () => {
      openAddMovieModal();
      addMovieForm({
        title: "Title",
        releasedDate: "2022-01-01",
        duration: 100,
        image:
          "https://img.xmovies8.fun/xxrz/250x400/100/15/1b/151b961f5343bebb7f434f3060079d97/151b961f5343bebb7f434f3060079d97.jpg",
        cost: "100",
      });

      const addMovieButton = screen.getByRole("button", {
        name: "Add",
      });
      userEvent.click(addMovieButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Description is empty");
    });
  });

  describe("Edit movie modal", () => {
    test("should render 'Edit Movie' modal if edit button is clicked", async () => {
      openEditMovieModal();
      const editMovieModalElement = await screen.findByRole("dialog");
      expect(editMovieModalElement).toBeInTheDocument();
    });

    test("should render modal title if edit button is clicked", async () => {
      openEditMovieModal();
      const editMovieTitle = await screen.findByTestId("modalTitle");
      expect(editMovieTitle).toBeInTheDocument();
      expect(editMovieTitle).toHaveTextContent("Edit Movie");
    });

    test("should show an error message 'Image is empty' when image is empty", async () => {
      openEditMovieModal();
      await editMovieForm({
        image: "",
        cost: moviesMockData.movies[0].cost,
        description: moviesMockData.movies[0].description,
      });

      const editMovieButton = screen.getByRole("button", {
        name: "Edit",
      });
      userEvent.click(editMovieButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Image is empty");
    });

    test("should show an error message 'Cost is empty' when cost is empty", async () => {
      openEditMovieModal();
      await editMovieForm({
        image: moviesMockData.movies[0].image,
        cost: "",
        description: moviesMockData.movies[0].description,
      });

      const editMovieButton = screen.getByRole("button", {
        name: "Edit",
      });
      userEvent.click(editMovieButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Cost is empty");
    });

    test("should show an error message 'Description is empty' when description is empty", async () => {
      openEditMovieModal();
      await editMovieForm({
        image: moviesMockData.movies[0].image,
        cost: moviesMockData.movies[0].cost,
        description: "",
      });

      const editMovieButton = screen.getByRole("button", {
        name: "Edit",
      });
      userEvent.click(editMovieButton);

      const errorMessage = screen.getByTestId("modalError");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Description is empty");
    });

    test("should notify the user with a message 'Movie has been updated' when successful", async () => {
      openEditMovieModal();
      await editMovieForm({
        image: moviesMockData.movies[0].image,
        cost: moviesMockData.movies[0].cost,
        description: moviesMockData.movies[0].description,
      });

      const editMovieConfirm = screen.getByRole("button", {
        name: "Edit",
      });
      userEvent.click(editMovieConfirm);
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });
  });

  describe("Delete movie modal", () => {
    test("should render disabled delete button", async () => {
      const deleteMovieBtn = screen.getAllByTestId("deleteBtn");
      expect(deleteMovieBtn[0]).toBeDisabled();
    });

    test("should render 'Delete Movie' when the button is not disabled", async () => {
      const deleteMovieBtn = screen.getAllByTestId("deleteBtn");
      expect(deleteMovieBtn[2]).not.toBeDisabled();
      userEvent.click(deleteMovieBtn[2]);

      const deleteMovieModal = await screen.findByRole("dialog");
      await waitFor(() => {
        expect(deleteMovieModal).toBeInTheDocument();
      });
    });

    test("should notify the user with a message 'Movie has been deleted' when successful", async () => {
      const deleteMovieBtn = screen.getAllByTestId("deleteBtn");
      expect(deleteMovieBtn[2]).not.toBeDisabled();
      userEvent.click(deleteMovieBtn[2]);

      const deleteMovieConfirm = screen.getByRole("button", {
        name: "Delete",
      });
      userEvent.click(deleteMovieConfirm);

      expect(
        await screen.findByText("Movie has been deleted")
      ).toBeInTheDocument();
    });
  });
});

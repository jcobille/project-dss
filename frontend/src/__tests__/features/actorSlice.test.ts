import reducer, {
  getActors,
  createActor,
  editActor,
  deleteActor,
  ActorState,
  clearErrorMessage,
  clearActorsList,
  searchActors,
  searchActorById,
} from "../../features/actorSlice";
import {
  actorListMockData,
  actorsListMock,
  editedActorMock,
  newActorMockData,
  selectedActorMock,
} from "../../utils/db.mocks";

describe("Actor Slice ExtraReducers", () => {
  const initialState: ActorState = {
    actors: [],
    searchedActors: [],
    selectedActor: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      image: "",
    },
    status: "idle",
    error: null,
  };

  const initialStateWithData: ActorState = {
    actors: actorsListMock,
    searchedActors: [],
    selectedActor: selectedActorMock,
    status: "idle",
    error: null,
  };

  describe("getActors", () => {
    it("pending", () => {
      const action = {
        type: getActors.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getActors.fulfilled.type,
        payload: actorsListMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: actorsListMock,
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: getActors.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "idle",
        error: null,
      });
    });
  });

  describe("searchActorById", () => {
    it("pending", () => {
      const action = {
        type: searchActorById.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: searchActorById.fulfilled.type,
        payload: actorListMockData,
      };
      const state = reducer(initialStateWithData, action);
      expect(state.actors).toEqual(actorsListMock);
    });

    it("rejected", () => {
      const action = {
        type: searchActorById.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "idle",
        error: null,
      });
    });
  });

  describe("createActor", () => {
    it("pending", () => {
      const action = {
        type: createActor.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: createActor.fulfilled.type,
        payload: newActorMockData,
      };
      const state = reducer(initialStateWithData, action);
      const actor = state.actors.find(
        (actor) => actor.id === newActorMockData.id
      );
      expect(actor).toBeTruthy();
    });

    it("rejected", () => {
      const action = {
        type: createActor.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "idle",
        error: null,
      });
    });
  });

  describe("editActor", () => {
    it("pending", () => {
      const action = {
        type: editActor.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: editActor.fulfilled.type,
        payload: editedActorMock,
      };
      const state = reducer(initialStateWithData, action);
      expect(state.actors[0]).toEqual(editedActorMock);
    });

    it("rejected", () => {
      const action = {
        type: editActor.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "idle",
        error: null,
      });
    });
  });

  describe("deleteActor", () => {
    it("pending", () => {
      const action = {
        type: deleteActor.pending.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteActor.fulfilled.type,
        payload: { id: "6369cf9f6b314926684a432e" },
      };
      const state = reducer(initialState, action);
      const actor = state.actors.find((actor) => {
        actor.id === "6369cf9f6b314926684a432e";
      });
      expect(actor).toBeUndefined();
    });

    it("rejected", () => {
      const action = {
        type: deleteActor.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        searchedActors: [],
        selectedActor: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          image: "",
        },
        status: "idle",
        error: null,
      });
    });
  });

  describe("reducers", () => {
    it("selects actor by ID", () => {
      let state = reducer(initialStateWithData, searchActors("anyName"));
      expect(state.selectedActor).toEqual(selectedActorMock);
    });

    it("clears the error message", () => {
      let state = reducer(initialStateWithData, searchActors("anyName"));
      expect(state.error).toEqual("No actors found");

      state = reducer(initialStateWithData, clearErrorMessage());
      expect(state.error).toBe("");
    });

    it("clears actorList", () => {
      const action = {
        type: getActors.fulfilled.type,
        payload: actorsListMock,
      };
      let state = reducer(initialStateWithData, action);
      expect(state.actors.length).toBe(2);

      state = reducer(initialStateWithData, clearActorsList());
      expect(state.actors.length).toBe(0);
    });

    it("search for actors", () => {
      let state = reducer(initialStateWithData, searchActors("dwayne"));
      const foundActors = state.searchedActors.find(
        (actor) => actor.id === selectedActorMock.id
      );
      expect(foundActors).toBeTruthy();
    });

    it("returns an error 'No actors found' when the searched item is cannot be found", () => {
      let state = reducer(initialStateWithData, searchActors("anyName"));
      expect(state.error).toEqual("No actors found");
    });
  });
});

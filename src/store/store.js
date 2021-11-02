import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies";
import singleMovieReducer from "./singleMovie";
import favoritesReducer from "./favorites";
import selectedUserReducer from "./selectedUser";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    selectedMovie: singleMovieReducer,
    favorites: favoritesReducer,
    selectedUser: selectedUserReducer,
  },
});

export default store;

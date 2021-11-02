import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getMoviesRequest = createAsyncThunk("MOVIES", (tittle) => {
  return axios
    .get(`https://www.omdbapi.com/?apikey=37532b34&s=${tittle}&page=1`)
    .then((r) => {
      console.log(r.data);
      return r.data;
    });
});

const moviesReducer = createReducer(
  {},
  {
    [getMoviesRequest.fulfilled]: (state, action) => action.payload,
    // [addToFavorites.fulfilled]: (state, action) => action.payload,
    // [removeFromFavorites.fulfilled]: (state, action) => action.payload,
  }
);

export default moviesReducer;

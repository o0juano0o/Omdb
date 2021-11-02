import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getSingleMovieRequest = createAsyncThunk("SINGLE_MOVIE", (id) => {
  return axios
    .get(`https://www.omdbapi.com/?apikey=37532b34&i=${id}&page=1`)
    .then((r) => {
      return r.data;
    });
});

const singleMovieReducer = createReducer(
  {},
  {
    [getSingleMovieRequest.fulfilled]: (state, action) => action.payload,
    // [addToFavorites.fulfilled]: (state, action) => action.payload,
    // [removeFromFavorites.fulfilled]: (state, action) => action.payload,
  }
);

export default singleMovieReducer;

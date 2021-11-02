import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getFavoriteRequest = createAsyncThunk("GETFAVORITE", (id) => {
  return axios
    .get(`/api/favorites/${id}`)
    .then((r) => {
      return r.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const setFavoriteRequest = createAsyncThunk(
  "SETFAVORITE",
  (movie, thunkAPI) => {
    const { user } = thunkAPI.getState();
    const userId = user.id;
    const { imdbID: favoriteId, Title: title } = movie; //desestructuracion y cambio de nombre para conconrdar con campos de db

    return axios
      .post(
        `/api/favorites?userId=${userId}&favoriteId=${favoriteId}&title=${title}`
      )
      .then((r) => {
        return r.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const removeFromFavorites = createAsyncThunk(
  "REMOVEFAVORITE",
  (id, thunkAPI) => {
    const { user } = thunkAPI.getState();
    const userId = user.id;

    return axios
      .delete(`/api/favorites?userId=${userId}&favoriteId=${id}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

const favoritesReducer = createReducer([], {
  [getFavoriteRequest.fulfilled]: (state, action) => {
    console.log(action.payload); // este funciona
    return action.payload;
  },
  [removeFromFavorites.fulfilled]: (state, action) => {
    console.log("hola");
    return action.payload;
  },
  [setFavoriteRequest.fulfilled]: (state, action) => {
    return [...state, action.payload];
  },
  // [addToFavorites.fulfilled]: (state, action) => action.payload,
});

export default favoritesReducer;

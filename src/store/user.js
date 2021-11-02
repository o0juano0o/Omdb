import axios from "axios";
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import { message } from "antd";

//get Single User

export const getSingleUser = createAsyncThunk("GETSINGLEUSER", (id) => {
  return axios
    .get(`/api/users/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

//LOGIN
export const sendLoginRequest = createAsyncThunk(
  "LOGIN",
  ({ username, password, remember }) => {
    const key = "login";

    return axios
      .post("http://localhost:3001/api/auth/login", {
        username,
        password,
        remember,
      })
      .then((r) => {
        message.success({ content: "Login success!!", key, duration: 2 });
        return r.data;
      })

      .catch(() => {
        message.error({ content: "Missing credentials", key, duration: 2 });
      });
  }
);

//LOGOUT
export const sendLogOutRequest = createAction("LOGOUT");

// SETUSER / PERSISTENCIA DE SESSION

export const setUser = createAction("SETUSER");

const userReducer = createReducer([], {
  [setUser]: (state, action) => action.payload,
  [sendLogOutRequest]: (state, action) => action.payload,
  [sendLoginRequest.fulfilled]: (state, action) => {
    if (action.payload) {
      const favorites = [];
      const { username, email, gender, id } = action.payload;
      return { username, email, gender, id, favorites };
    }
  },
});

export default userReducer;

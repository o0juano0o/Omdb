import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

//get Single User from

export const getSingleUser = createAsyncThunk("GETSINGLEUSER", (id) => {
  return axios
    .get(`/api/users/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

const selectedUserReducer = createReducer(
  {},
  {
    [getSingleUser.fulfilled]: (state, action) => action.payload,
  }
);

export default selectedUserReducer;

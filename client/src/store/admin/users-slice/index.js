import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  usersList: []
};

export const getAllUsersAdmin = createAsyncThunk(
    "/users/getAllUsersAdmin",
    async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/users/get`
      ); 
      return response.data;
    }
);

export const deleteUserAdmin = createAsyncThunk(
  "/users/deleteUserAdmin",
  async (userId) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/users/delete/${userId}`
    );
    return response?.data;
  }
);

const adminUserSlice = createSlice({
    name: "adminUserSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersList = action.payload.data;
      })
      .addCase(getAllUsersAdmin.rejected, (state) => {
        state.isLoading = false;
        state.usersList = [];
      });
}});

export default adminUserSlice.reducer;
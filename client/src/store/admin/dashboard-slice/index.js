import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userList: [],
  orderList: [],
  productList: [],
  totalSum: 0,
  chartData: []
};

export const getAllUsersForAdmin = createAsyncThunk(
    "/dashboard/getAllUsersForAdmin",
    async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/dashboard/users`
      );
      return response.data;
    }
);

export const getAllOrdersForAdmin = createAsyncThunk(
  "/dashboard/getAllOrdersForAdmin",
  async () =>{
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/dashboard/orders`
    );
    return response.data;
  }
);

export const getAllProductsForAdmin = createAsyncThunk(
  "/dashboard/getAllProductsForAdmin",
  async () =>{
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/dashboard/products`
    );
    return response.data;
  }
);

export const getSummaryForAdmin = createAsyncThunk(
  "/dashboard/getSummaryForAdmin",
  async () =>{
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/dashboard/sum`
    );
    return response.data.totalSum;
  }
);

export const getChartData = createAsyncThunk(
  "/dashboard/getChartData",
  async () =>{
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/dashboard/chart`
    );
    return response.data;
  }
);

const adminDashboardSlice = createSlice({
    name: "adminDashboardSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsersForAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllUsersForAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.userList = action.payload.data;
        })
        .addCase(getAllUsersForAdmin.rejected, (state) => {
          state.isLoading = false;
          state.userList = [];
        })
        .addCase(getAllOrdersForAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.orderList = action.payload.data;
        })
        .addCase(getAllOrdersForAdmin.rejected, (state) => {
          state.isLoading = false;
          state.orderList = [];
        })
        .addCase(getAllProductsForAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllProductsForAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(getAllProductsForAdmin.rejected, (state) => {
          state.isLoading = false;
          state.productList = [];
        })
        .addCase(getSummaryForAdmin.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getSummaryForAdmin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.totalSum = action.payload;
        })
        .addCase(getSummaryForAdmin.rejected, (state) => {
          state.isLoading = false;
          state.totalSum = 0;
        })
        .addCase(getChartData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getChartData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.chartData = action.payload;
        })
        .addCase(getChartData.rejected, (state) => {
          state.isLoading = false;
          state.chartData = [];
        });
    }
});

export default adminDashboardSlice.reducer;
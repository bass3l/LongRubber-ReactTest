import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRestaurantRequest } from "../../services/api";

export const fetchRestaurant = createAsyncThunk(
  "fetchRestaurant",
  getRestaurantRequest
);

const slice = createSlice({
  name: "restaurant",
  initialState: { data: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchRestaurant.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectRestaurant = (state) => state.restaurant.data;
export const selectLoading = (state) => state.restaurant.loading;

export const getRestaurantById = (id) => (store) => {
  return store.restaurant.data.filter((element) => element.id === id)[0];
};

export default slice.reducer;

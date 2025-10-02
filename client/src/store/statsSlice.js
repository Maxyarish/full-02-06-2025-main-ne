import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminStats } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getAdminStatsThunk = createAsyncThunk(
  "stats/getAdminStats",
  async (_, thunkAPI) => {
    try {
      const response = await getAdminStats();
      return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.message)
    }
  }
);

const initialState = {
  stats: {
    users: [],
    orders: [],
    products: [],
  },
  error: null,
  isLoading: false,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminStatsThunk.pending, pendingCase);
    builder.addCase(getAdminStatsThunk.rejected, rejectedCase);
    builder.addCase(getAdminStatsThunk.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.stats = action.payload;
    });
  },
});


export default statsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pendingCase, rejectedCase } from "./functions";
import {
  createChangelog,
  deleteChangelog,
  getAllChangelogs,
} from "../api/index.js";

export const createChangelogThunk = createAsyncThunk(
  "changelogs/createChangelogThunk",
  async (values, thunkAPI) => {
    try {
      const response = await createChangelog(values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getAllChangelogsThunk = createAsyncThunk(
  "changelogs/getAllChangelogsThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getAllChangelogs();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteChangelogThunk = createAsyncThunk(
  "changelogs/deleteChangelogThunk",
  async (id, thunkAPI) => {
    try {
      const response = await deleteChangelog(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const changelogSlice = createSlice({
  name: "changelogs",
  initialState: {
    changelogs: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createChangelogThunk.pending, pendingCase);
    builder.addCase(createChangelogThunk.rejected, rejectedCase);
    builder.addCase(createChangelogThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.changelogs.push(action.payload);
    });

    builder.addCase(getAllChangelogsThunk.pending, pendingCase);
    builder.addCase(getAllChangelogsThunk.rejected, rejectedCase);
    builder.addCase(getAllChangelogsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.changelogs = action.payload;
    });

    builder.addCase(deleteChangelogThunk.pending, pendingCase);
    builder.addCase(deleteChangelogThunk.rejected, rejectedCase);
    builder.addCase(deleteChangelogThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.changelogs = state.changelogs.filter(
        (changelog) => changelog._id !== action.payload._id
      );
    });
  },
});

export default changelogSlice.reducer;

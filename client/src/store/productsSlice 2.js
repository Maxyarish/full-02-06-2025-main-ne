import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getProductSale,
  getSearchProducts,
  getProductsFilters,
} from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getProductsFiltersThunk = createAsyncThunk(
  "products/getProductsFiltersThunk",
  async (query, thunkAPI) => {
    try {
      const response = await getProductsFilters(query);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
export const getSearchProductsThunk = createAsyncThunk(
  "products/getSearchProductsThunk",
  async (query, thunkAPI) => {
    try {
      const response = await getSearchProducts(query);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
export const getOneProductThunk = createAsyncThunk(
  "products/getOneProductThunk",
  async (id, thunkAPI) => {
    try {
      const response = await getOneProduct(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getAllProductsThunk = createAsyncThunk(
  "products/getAllProductsThunk",
  async (options , thunkAPI) => {
    try {
      const response = await getAllProducts(options);
      return {
        products: response.data.data,
        total: response.data.total, 
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "products/createProductThunk",
  async (values, thunkAPI) => {
    try {
      const response = await createProduct(values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "products/updateProductThunk",
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await updateProduct(id, values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProductThunk",
  async (id, thunkAPI) => {
    try {
      const response = await deleteProduct(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
export const getProductSaleThunk = createAsyncThunk(
  "products/getProductSaleThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getProductSale();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    searchResults: [],
    error: null,
    isLoading: false,
    selectedProduct: null,
    totalProducts: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsFiltersThunk.pending, pendingCase);
    builder.addCase(getProductsFiltersThunk.rejected, rejectedCase);
    builder.addCase(getProductsFiltersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload;
    });

    builder.addCase(getOneProductThunk.pending, pendingCase);
    builder.addCase(getOneProductThunk.rejected, rejectedCase);
    builder.addCase(getOneProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.selectedProduct = action.payload;
    });

    builder.addCase(createProductThunk.pending, pendingCase);
    builder.addCase(createProductThunk.rejected, rejectedCase);
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products.push(action.payload);
    });

    builder.addCase(updateProductThunk.pending, pendingCase);
    builder.addCase(updateProductThunk.rejected, rejectedCase);
    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });

    builder.addCase(deleteProductThunk.pending, pendingCase);
    builder.addCase(deleteProductThunk.rejected, rejectedCase);
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    });

    builder.addCase(getAllProductsThunk.pending, pendingCase);
    builder.addCase(getAllProductsThunk.rejected, rejectedCase);
    builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload.products;
      state.totalProducts = action.payload.total;
    });
    builder.addCase(getProductSaleThunk.pending, pendingCase);
    builder.addCase(getProductSaleThunk.rejected, rejectedCase);
    builder.addCase(getProductSaleThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload;
    });

    builder.addCase(getSearchProductsThunk.pending, pendingCase);
    builder.addCase(getSearchProductsThunk.rejected, rejectedCase);
    builder.addCase(getSearchProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.searchResults = action.payload;
    });
  },
});

export default productsSlice.reducer;

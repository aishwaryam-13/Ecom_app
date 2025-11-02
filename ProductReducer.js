import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/product";


export const fetchproduct = createAsyncThunk("product/fetchproduct", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, newProduct);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchproduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});


export default productSlice.reducer;

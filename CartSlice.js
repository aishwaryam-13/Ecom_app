import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8000/cart";


export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await axios.get(API);
  return res.data;
});


export const addToCart = createAsyncThunk("cart/add", async (product) => {
  const res = await axios.get(`${API}?id=${product.id}`);
  if (res.data.length > 0) {
    const existing = res.data[0];
    const updated = { ...existing, qty: existing.qty + 1 };
    await axios.put(`${API}/${existing.id}`, updated);
    return updated;
  } else {
    const newItem = { ...product, qty: 1 };
    const res2 = await axios.post(API, newItem);
    return res2.data;
  }
});

export const updateQty = createAsyncThunk("cart/updateQty", async ({ id, qty }) => {
  const res = await axios.patch(`${API}/${id}`, { qty });
  return res.data;
});

export const removeFromCart = createAsyncThunk("cart/remove", async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});


export const clearCart = createAsyncThunk("cart/clear", async () => {
  const res = await axios.get(API);
  for (let item of res.data) {
    await axios.delete(`${API}/${item.id}`);
  }
  return [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existing = state.items.find((i) => i.id === action.payload.id);
        if (existing) {
          existing.qty = action.payload.qty;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(updateQty.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index >= 0) state.items[index] = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;

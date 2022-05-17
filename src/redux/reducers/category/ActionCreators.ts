import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadCategories = createAsyncThunk(
  "categories/load",
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    try {
      const res = await fetch(`/categories`, {
        headers: {
          Authorization: `Bearer ${state.userSlice.token}`,
        },
      });

      const categories = await res.json();
      return thunkApi.fulfillWithValue(categories);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async (name: string, thunkApi) => {
    const state: any = thunkApi.getState();
    try {
      const res = await fetch("categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state.userSlice.token}`,
        },
        body: JSON.stringify({ name }),
      });

      const category = await res.json();
      return thunkApi.fulfillWithValue(category);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

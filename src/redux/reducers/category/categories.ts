import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../../models/ITodo";
import { createCategory, loadCategories } from "./ActionCreators";

interface CategoryState {
  categories: ICategory[];
  error: string;
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: true,
  error: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [loadCategories.pending.type]: (state) => {
      state.loading = true
    },

    [loadCategories.fulfilled.type]: (state, action: PayloadAction<ICategory[]>) => {
      state.loading = false
      state.error = ''
      state.categories = action.payload
    },

    [loadCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    [createCategory.pending.type]: (state) => {
      state.loading = true
    },

    [createCategory.fulfilled.type]: (state, action: PayloadAction<ICategory>) => {
      state.loading = false
      state.error = ''
      state.categories.push(action.payload)
    },

    [createCategory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export default categorySlice.reducer

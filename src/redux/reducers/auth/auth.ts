import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/ITodo";
import { loadUsers, login, logOut, registration } from "./ActionCreators";

interface UserState {
  users: IUser[];
  error: string;
  loading: boolean;
  token: string | null;
  id: string | null;
}

const initialState: UserState = {
  users: [],
  error: "",
  loading: false,
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [loadUsers.pending.type]: (state) => {
      state.loading = true;
    },

    [loadUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.loading = false;
      state.error = "";
      state.users = action.payload;
    },

    [loadUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    [registration.pending.type]: (state) => {
      state.loading = true;
    },

    [registration.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.error = "";
      state.users.push(action.payload);
    },

    [registration.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    [login.pending.type]: (state) => {
      state.loading = true;
    },

    [login.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = "";
      state.token = action.payload.token;
      state.id = action.payload.id
    },

    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    [logOut.fulfilled.type]: (state) => {
      state.loading = false;
      state.error = "";
      state.token = null;
    },
  },
});

export default userSlice.reducer;

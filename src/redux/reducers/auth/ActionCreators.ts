import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadUsers = createAsyncThunk("users/load", async (_, thunkApi) => {
  try {
    const res = await fetch("/users");
    const users = await res.json();

    return thunkApi.fulfillWithValue(users);
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

export const registration = createAsyncThunk(
  "user/registration",
  async (data: { email: string; password: string; name: string }, thunkApi) => {
    try {
      const res = await fetch("/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
        }),
      });
      const user = await res.json();

      return thunkApi.fulfillWithValue(user);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, thunkApi) => {
    const res = await fetch("/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    const tokenId = await res.json();

    if (res.ok) {
      localStorage.setItem("token", tokenId.token);
      localStorage.setItem("id", tokenId.id);
      return thunkApi.fulfillWithValue(tokenId);
    }

    if(!res.ok) {
      return thunkApi.rejectWithValue('Неверный логин или пароль!');
    }

  }
);

export const logOut = createAsyncThunk(
  'user/logout',
  async (_, thunkApi) => {
    localStorage.clear()
  }
)

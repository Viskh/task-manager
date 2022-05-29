import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadTodos = createAsyncThunk(
  "todos/load",
  async (id: string | null, thunkApi) => {
    const state: any = thunkApi.getState();
    try {
      const res = await fetch(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${state.userSlice.token}`,
        },
      });

      const todos = await res.json();
      return thunkApi.fulfillWithValue(todos);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todo/create",
  async (
    data: {
      todoTitle: string;
      todoText: string;
      todoCategory: string;
      id: string | null;
    },
    thunkApi
  ) => {
    const state: any = thunkApi.getState();

    try {
      const res = await fetch("/todos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.userSlice.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.todoTitle,
          text: data.todoText,
          user: data.id,
          category: data.todoCategory,
        }),
      });

      const todo = await res.json();

      return thunkApi.fulfillWithValue(todo);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (id: string, thunkApi) => {
    const state: any = thunkApi.getState();

    try {
      await fetch(`/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.userSlice.token}`,
        },
      });

      return thunkApi.fulfillWithValue(id);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const checkTodo = createAsyncThunk(
  "todo/check",
  async (data: { todoId: string; completed: boolean }, thunkApi) => {
    const state: any = thunkApi.getState();

    try {
      await fetch(`/todos/${data.todoId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.userSlice.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !data.completed }),
      });

      return thunkApi.fulfillWithValue(data.todoId);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/update",
  async (
    data: {
      todoId: string;
      todoTitle: string;
      todoText: string;
      todoCategory: string;
    },
    thunkApi
  ) => {
    const state: any = thunkApi.getState();

    try {
      const res = await fetch(`/todos/${data.todoId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.userSlice.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: data.todoText,
          title: data.todoTitle,
          category: data.todoCategory,
        }),
      });

      const todo = await res.json()

      return thunkApi.fulfillWithValue(todo);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

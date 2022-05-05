import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../../models/ITodo";
import { createTodo, deleteTodo, loadTodos, updateTodo } from "./ActionCreators";

interface TodoState {
  todos: ITodo[];
  error: string;
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: true,
  error: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    [loadTodos.pending.type]: (state) => {
      state.loading = true
    },

    [loadTodos.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.loading = false
      state.error = ''
      state.todos = action.payload
    },

    [loadTodos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    [createTodo.pending.type]: (state) => {
      state.loading = true
    },

    [createTodo.fulfilled.type]: (state, action: PayloadAction<ITodo>) => {
      state.loading = false
      state.error = ''
      state.todos.push(action.payload)
    },

    [createTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    [deleteTodo.pending.type]: (state) => {
      state.loading = true
    },

    [deleteTodo.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = ''
      state.todos = state.todos.filter(todo => todo._id !== action.payload)
    },

    [deleteTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },

    [updateTodo.pending.type]: (state) => {
      state.loading = true
    },

    [updateTodo.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = ''
      state.todos.map(todo => {
        if(todo._id === action.payload) {
          todo.completed = !todo.completed
          return todo
        }
        return todo
      })
    },

    [updateTodo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  }
});

export default todoSlice.reducer;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoSlice from './reducers/todos/todos'
import userSlice from './reducers/auth/auth'
import categorySlice from './reducers/category/categories'

const rootReducer = combineReducers({
  todoSlice, userSlice, categorySlice
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from "./pizzaApi.js";
import pizzaSlice from "./pizzaSlice.js";

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    // add your reducer(s) here
    [pizzaApi.reducerPath]: pizzaApi.reducer,
    pizzaState: pizzaSlice,
  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    pizzaApi.middleware
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "../Reducers/TaskReducer";
import AuthReducer from "../Reducers/AuthReducer";
import { expenseApi } from "../services/expenseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    [expenseApi.reducerPath]: expenseApi.reducer,
    tasks: TaskReducer,
    auth: AuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, expenseApi.middleware),
});

setupListeners(store.dispatch);
export default store;

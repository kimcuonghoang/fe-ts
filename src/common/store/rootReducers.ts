import { combineReducers } from "@reduxjs/toolkit";
import filterSlice from "./slice/filter.slice";

export const rootReducers = combineReducers({
  filter: filterSlice,
});

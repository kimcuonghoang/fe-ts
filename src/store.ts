import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./features/counter/cartSlice";
const store = configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

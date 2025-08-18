// store.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for cart items, e.g. CartItem
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload); // Immer cho phép mutate
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

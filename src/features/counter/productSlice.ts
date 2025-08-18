import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../common/types/Product";

const initialState: ProductState = {
  product: [],
  loading: false,
  error: null,
  success: false,
};
export const inititalProduct: Product = {
  id: 0,
  name: "",
  price: 0,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.product.push(action.payload);
      state.success = true;
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.product = state.product.filter(
        (product) => product.id !== action.payload
      );
      state.success = true;
    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.product = state.product.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;

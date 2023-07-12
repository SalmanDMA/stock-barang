import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
 name: 'product',
 initialState: {
  products: [],
  editingProduct: {},
 },
 reducers: {
  setProducts(state, action) {
   state.products = action.payload;
  },
  setEditingProduct(state, action) {
   state.editingProduct = action.payload;
  },
 },
});

export const { setProducts, setEditingProduct } = productsSlice.actions;

export default productsSlice.reducer;

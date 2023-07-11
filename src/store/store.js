import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlices';
import categoriesReducer from './slices/categoriesSlices';

const store = configureStore({
 reducer: {
  products: productsReducer,
  categories: categoriesReducer,
 },
});

export default store;

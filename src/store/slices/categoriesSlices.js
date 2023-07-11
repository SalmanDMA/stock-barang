import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
 name: 'categories',
 initialState: {
  categoryQuery: [
   {
    id: 0,
    name: 'All',
   },
  ],
  category: false,
  categoryValue: '',
 },
 reducers: {
  setCategoryQuery(state, action) {
   state.categoryQuery = action.payload;
  },

  setCategory(state, action) {
   state.category = action.payload;
  },
  setCategoryValue(state, action) {
   state.categoryValue = action.payload;
  },
 },
});

export const { setCategoryQuery, setCategory, setCategoryValue } = categoriesSlice.actions;

export default categoriesSlice.reducer;

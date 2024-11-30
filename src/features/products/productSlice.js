import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    page: 1,
    pageSize: 5,
    categoryName: "",
    productName: "",
    minPrice: "",
    maxPrice: "",
    onlySales: false,
  },
  totalPages: 0,

  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filters.page = 1;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.filters.pageSize = action.payload;
      state.filters.page = 1; 
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setFilters,
  resetFilters,
  setTotalPages,
  setPage,
  setPageSize,
  clearFilters,
  setProducts,
} = productSlice.actions;

export default productSlice.reducer;

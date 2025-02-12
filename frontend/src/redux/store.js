import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/adminAuthSlice"; 
import productReducer from "./slices/productSlice"

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer, 
    products: productReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import searchProductReducer from "./searchProduct";
import cartReducer from "./cart";
import uiSliceReducer from "./ui-slice";
import listProductsReducer from "./list-products";

const store = configureStore({
  reducer: {
    searchProduct: searchProductReducer,
    cart: cartReducer,
    ui: uiSliceReducer,
    listProducts: listProductsReducer,
  },
});

export default store;

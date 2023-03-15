import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  productsData: [],
  moreProductDisabled : false,
  skipIndex : 1
};

const listProductsSlice = createSlice({
  name: "listProducts",
  initialState: initialProductState,
  reducers: {
    loadListProductData(state, action) {
      state.productsData = action.payload.productsData;
    },
    loadedMoreProduct(state, action) {
      console.log(action.payload.productsMoreData)
      state.productsData = state.productsData.concat(action.payload.productsMoreData);
    },
    disableMoreButton(state) {
      state.moreProductDisabled = false;
    },
    enableMoreButton(state) {
      state.moreProductDisabled = true;
    },
    resetSkipIndex(state){
      state.skipIndex = 1;
    },
    increaseSkipIndex(state) {
      state.skipIndex++;
    }
  },
});

export const listProductsActions = listProductsSlice.actions;
export default listProductsSlice.reducer;

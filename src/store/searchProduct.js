import { createSlice }from '@reduxjs/toolkit'

import $ from "jquery";

const initialSearchProductState = {
    showSearchProduct: false,
}

const searchProductSlice = createSlice({
    name: 'searchProduct',
    initialState: initialSearchProductState,
    reducers: {        
        open(state) {
            state.showSearchProduct = true;
            $("#search-product").slideDown("slow");
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        close(state) {
            state.showSearchProduct = false;
            $("#search-product").fadeOut("fast");
        },
    } 
 });
 
 export const searchProductActions = searchProductSlice.actions
 export default searchProductSlice.reducer

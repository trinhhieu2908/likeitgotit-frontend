import { createSlice } from "@reduxjs/toolkit";

import $ from "jquery";

const initialState = {
  currentPage: "home-page",
  showCart: false,
  notification: null,
};

function animation() {
  var tabsNewAnim = $("#navbarPageContent");
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  if (itemPosNewAnimTop === undefined || itemPosNewAnimLeft === undefined) {
    return;
  } else {
    $("#page-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  }
}

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    changePage(state, action) {
      if (action.payload !== "") {
        state.currentPage = action.payload;
        $("#navbarPageContent ul li a").removeClass("active");
        $(`#${action.payload}`).addClass("active");
        setTimeout(function () {
          animation();
        }, 200);
      }
    },
    runAnimation() {
      animation();
    },
    openCart(state) {
      state.showCart = true;
    },
    closeCart(state) {
      state.showCart = false;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

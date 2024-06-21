import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductAction } from "./Actions/shopActions";
import { toaster } from "@utils";
import { editProductAction } from "./Actions/editProduct";
import { buyRequestAction } from "./Actions/buyRequest";
import { rentRequestAction } from "./Actions/rentRequest";
import { auctionRequestAction } from "./Actions/auctionRequest";
import { deleteProductAction } from "./Actions/deleteProduct";
const initialStateObj = {
  shopDetail: {},
  productEditDetail: {},
  loading: false,
  transaction: {
    type: null,
    hash: null,
    status: null,
    result: null,
  },
  error: null,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState: initialStateObj,
  reducers: {
    addProduct: (state, { payload }) => {
      state.shopDetail = payload;
    },
    editProduct: (state, { payload }) => {
      state.productEditDetail = payload;
    },
    setTransaction: (state, { payload }) => {
      state.transaction = payload.transaction;
      if (payload.error) {
        state.error = payload.error;
        toaster("error", payload.error);
      }
    },
  },
  extraReducers: {
    [createProductAction.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [createProductAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [createProductAction.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toaster("error", payload);
    },
    [editProductAction.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [editProductAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [editProductAction.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toaster("error", payload);
    },
    [buyRequestAction.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [buyRequestAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [buyRequestAction.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toaster("error", payload);
    },
    [rentRequestAction.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [rentRequestAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [rentRequestAction.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toaster("error", payload);
    },
    [auctionRequestAction.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [auctionRequestAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [auctionRequestAction.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toaster("error", payload);
    },
    [deleteProductAction.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [deleteProductAction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [deleteProductAction.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toaster("error", payload);
    },
  },
});

export const { addProduct, editProduct, setTransaction } = shopSlice.actions;

//it behave like connector (old redux)
export const shopSliceSelector = (state) => state.utility;

const shopReducer = shopSlice.reducer;
const shopState = (state) => state?.shop;
export { shopReducer, shopState };

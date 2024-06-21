import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialStateObj = {
    verificationScreenDisplay: false,
    registerData: null,
};

export const utilitySlice = createSlice({
    name: "utility",
    initialState: initialStateObj,
    reducers: {
        verificationScreen: (state, { payload }) => {
            state.verificationScreenDisplay = payload;
        },
        registerSlice: (state, { payload }) => {
            state.registerData = payload;
        }
    },
});

export const { verificationScreen, registerSlice } = utilitySlice.actions;

//it behave like connector (old redux)
export const utilitySliceSelector = (state) => state.utility;

const utilityReducer = utilitySlice.reducer;
export { utilityReducer };

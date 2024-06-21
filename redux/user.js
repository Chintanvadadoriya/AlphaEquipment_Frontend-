import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const fetchUserById = createAsyncThunk(
//     'users/createUser',
//     async (userId, { getState, rejectWithValue, dispatch }) => {
//     //   const response = await userAPI.fetchById(userId)
//     //   return response.data
//     }
//   )

const initialStateObj = {
    userData: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialStateObj,
    reducers: {
        userStore: (state, { payload }) => {
            state.userData = payload;
        }
    },
    // extraReducers: {
    //     [fetchUserById.pending]: (state, { payload }) => {
    //         state.loading = true;
    //     },
    //     [fetchUserById.fulfilled]: (state, { payload }) => {
    //         state.loading = true;
    //     },
    //     [fetchUserById.rejected]: (state, { payload }) => {

    //     },
    // }
});

export const { userStore } = userSlice.actions;

//it behave like connector (old redux)
export const userSliceSelector = (state) => state.user;

const userReducer = userSlice.reducer;
export { userReducer };

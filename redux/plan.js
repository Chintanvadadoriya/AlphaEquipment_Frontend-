import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
    planId: ''
};

export const planSlice = createSlice({
    name: "plan",
    initialState: initialStateObj,
    reducers: {
        updatePlanStatus: (state, { payload }) => {
            state.planId = payload;
        }
    },
});

export const { updatePlanStatus } = planSlice.actions;

//it behave like connector (old redux)
export const planSelector = (state) => state?.plan?.planId;

const planReducer = planSlice.reducer
export { planReducer };
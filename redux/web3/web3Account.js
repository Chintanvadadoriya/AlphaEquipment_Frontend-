const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  userAccount: null,
  currentChainId: null,
};

const web3AccountSlice = createSlice({
  name: "web3Account",
  initialState,
  reducers: {
    setAccountAction: (state, action) => {
      state.userAccount = action.payload;
    },
    setChainIdAction: (state, action) => {
      state.currentChainId = action.payload;
    },
  },
});

export const web3AccountReducer = web3AccountSlice.reducer;

export const { setAccountAction, setChainIdAction } = web3AccountSlice.actions;

export const web3AccountState = (state) => state?.web3Account;

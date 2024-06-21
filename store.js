import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
// import mobileReducer from "./redux/mobileCheck";
import { mobileReducer, userReducer, utilityReducer, shopReducer, planReducer, web3AccountReducer } from "@redux";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const serverStore = configureStore({
  reducer: {
    mobileCheck: mobileReducer,
    user: userReducer,
    utility: utilityReducer,
    shop: shopReducer,
    plan: planReducer,
    web3Account: web3AccountReducer,
  },
  middleware: customizedMiddleware,
  devTools: true,
});

const store = () => {
  const combinedReducer = combineReducers({
    mobileCheck: mobileReducer,
    user: userReducer,
    utility: utilityReducer,
    shop: shopReducer,
    plan: planReducer,
    web3Account: web3AccountReducer,
  });

  const persistConfig = {
    key: "alpha",
    storage,
    blacklist: ["profile"],
  };

  const persistedReducer = persistReducer(persistConfig, combinedReducer);

  const cstore = configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware,
  });

  cstore.__persistor = persistStore(cstore);
  return cstore;
};

const makeStore = ({ isServer }) => (isServer ? serverStore : store());

export const wrapper = createWrapper(makeStore);

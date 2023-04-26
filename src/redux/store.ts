import storage from "redux-persist/lib/storage";
import {encryptTransform} from "redux-persist-transform-encrypt";
import {persistReducer, persistStore} from "redux-persist";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice, {IAuthSlice} from "./slices/authSlice";
import flowSlice, {IFlowSlice} from "./slices/flowSlice";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_REDUX_SECRET_KEY as string,
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  whitelist: ["auth"]
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authSlice.reducer,
  flow: flowSlice.reducer,
}));

const store = configureStore({
  reducer: persistedReducer
})

export type RootState = {
  auth: IAuthSlice,
  flow: IFlowSlice,
};
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;

import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountsReducer from "../features/accounts/accountsSlice";
import connectionReducer from "../features/connection/connectionSlice";
import tokenPricesSlice from "../features/tokenPrices/tokenPricesSlice";
import stakedNftsSlice from "../features/stakedNftsSlice.ts/stakedNftsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = persistReducer(
  persistConfig,
  combineReducers({
    accounts: accountsReducer,
    connection: connectionReducer,
    tokenPrices: tokenPricesSlice,
    stakedNfts: stakedNftsSlice,
  })
);

export const store = configureStore({
  reducer,
  middleware: (mw) => mw({ immutableCheck: false, serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

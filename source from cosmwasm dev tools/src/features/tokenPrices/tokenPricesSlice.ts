import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { getUnixTimeStamp } from "../../util/date";
import getQuery from "../../util/useAxios";

const TOKEN_ID = {
  juno: "juno-network",
  hope: "hope-galaxy",
};

export type TokenPriceType = {
  hope: any;
  juno: any;
};

export type TokenHistoryItemType = {
  label: string;
  value: number;
};

export enum TokenHistoryPeriod {
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "YEARLY",
}

export type TokenPricesType = {
  price: TokenPriceType;
  priceHistory: TokenHistoryItemType[];
  historyOption: {
    historyPeriod: TokenHistoryPeriod;
    priceType: "juno" | "hope";
  };
};

const TimeFormats = {
  [TokenHistoryPeriod.DAILY]: "hh:mm",
  [TokenHistoryPeriod.WEEKLY]: "MM-DD",
  [TokenHistoryPeriod.MONTHLY]: "MM-DD",
  [TokenHistoryPeriod.YEARLY]: "YYYY-MM",
};

const getFromFunctions: { [key: number]: () => number } = {
  [TokenHistoryPeriod.DAILY]: () =>
    new Date().setDate(new Date().getDate() - 1),
  [TokenHistoryPeriod.WEEKLY]: () =>
    new Date().setDate(new Date().getDate() - 7),
  [TokenHistoryPeriod.MONTHLY]: () =>
    new Date().setMonth(new Date().getMonth() - 1),
  [TokenHistoryPeriod.YEARLY]: () =>
    new Date().setFullYear(new Date().getFullYear() - 1),
};

let initialState: TokenPricesType = {
  price: { hope: null, juno: null },
  priceHistory: [],
  historyOption: {
    historyPeriod: TokenHistoryPeriod.WEEKLY,
    priceType: "hope",
  },
};

export const fetchTokenPrices = createAsyncThunk(
  "tokenPrices/fetchTokenPrice",
  async () => {
    const currentHopePrice = await getQuery(
      `https://api.coingecko.com/api/v3/coins/${TOKEN_ID.hope}`
    );
    const currentJunoPrice = await getQuery(
      `https://api.coingecko.com/api/v3/coins/${TOKEN_ID.juno}`
    );
    return {
      juno: currentJunoPrice,
      hope: currentHopePrice,
    };
  }
);

export const fetchTokenPriceHistory = createAsyncThunk(
  "tokenPrices/fetchTokenPriceHistory",
  async ({
    period,
    token,
  }: {
    period: TokenHistoryPeriod;
    token: "juno" | "hope";
  }) => {
    let from: number = getFromFunctions[period]();

    const getLink = `https://api.coingecko.com/api/v3/coins/${
      TOKEN_ID[token]
    }/market_chart/range?vs_currency=usd&from=${getUnixTimeStamp(
      from
    )}&to=${getUnixTimeStamp(new Date())}`;
    const historyResult = await getQuery(getLink);
    const priceHistory = historyResult.prices;
    return priceHistory.map((historyItem: any) => ({
      label: moment(new Date(historyItem[0])).format(TimeFormats[period]),
      value: historyItem[1],
    }));
  }
);

export const tokenPricesSlice = createSlice({
  name: "tokenPrices",
  initialState,
  reducers: {
    clearTokenPrice: (state, action: PayloadAction) => {
      state.price = { hope: null, juno: null };
      state.priceHistory = [];
    },
    setHistoryOption: (
      state,
      action: PayloadAction<{
        historyPeriod: TokenHistoryPeriod;
        priceType: "juno" | "hope";
      }>
    ) => {
      state.historyOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokenPrices.fulfilled, (state, action) => {
      const { juno, hope } = action.payload;
      state.price = { juno, hope };
    });
    builder.addCase(fetchTokenPriceHistory.fulfilled, (state, action) => {
      state.priceHistory = action.payload;
    });
  },
});

export const { clearTokenPrice, setHistoryOption } = tokenPricesSlice.actions;

export default tokenPricesSlice.reducer;

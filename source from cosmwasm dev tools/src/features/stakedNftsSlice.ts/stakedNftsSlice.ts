import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState: { nfts: any[] } = { nfts: [] };

export const stakedNftsSlice = createSlice({
  name: "stakedNfts",
  initialState,
  reducers: {
    setStakedNfts: (state, action: PayloadAction<any[]>) => {
      state.nfts = action.payload;
    },
  },
});

export const { setStakedNfts } = stakedNftsSlice.actions;

export default stakedNftsSlice.reducer;

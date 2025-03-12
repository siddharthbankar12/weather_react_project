import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: { city: null, country: null },
  reducers: {
    currentLocation: (state, action) => {
      const { city, country } = action.payload;
      state.city = city;
      state.country = country;
    },
  },
});

export const { currentLocation } = locationSlice.actions;

export default locationSlice.reducer;

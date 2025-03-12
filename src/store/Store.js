import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../store/Location";

const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});

export default store;

// utils/carouselSlice.js
import { createSlice } from '@reduxjs/toolkit';

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    profiles: [],
  },
  reducers: {
    addCarouselProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
});

export const { addCarouselProfiles } = carouselSlice.actions;

export default carouselSlice.reducer;

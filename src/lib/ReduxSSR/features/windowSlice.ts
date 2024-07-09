import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WindowState {
  isMobile: boolean;
}

const initialState: WindowState = {
  isMobile: false,
};

const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = windowSlice.actions;
export default windowSlice.reducer;
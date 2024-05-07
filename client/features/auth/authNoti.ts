// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: any[]; // Define your notification structure here
}

const initialState: NotificationState = {
  notifications: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<any[]>) => {
      state.notifications = action.payload;
    },
  },
});

export const { setNotification } = authSlice.actions;

export default authSlice.reducer;

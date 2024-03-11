import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log('Login action payload:', action.payload);
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      console.log('Logout action triggered');
      state.user = null;
    },
    updateProfile: (state, action) => {
      console.log('Update profile action payload:', action.payload);
      state.user = action.payload;
    },
  },
});

export const { setLogin, setLogout, updateProfile } = authSlice.actions;
export default authSlice.reducer;

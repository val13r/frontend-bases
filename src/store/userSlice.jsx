import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userId: localStorage.getItem('userId') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.userId = null;
      localStorage.removeItem('userId');
    },
  },
});

export const { setUser, setUserId, logout } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id:null,
    username: '',
    token: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.userId;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = '';
      state.token = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

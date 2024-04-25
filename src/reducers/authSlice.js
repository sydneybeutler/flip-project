import { createSlice } from '@reduxjs/toolkit';

// Define the initial state of the auth slice
const initialState = {
  token: null,  // This will hold the JWT token
  id: null,     // This will hold the user ID
}

// Create the slice.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the token
    setToken(state, action) {
      state.token = action.payload;
    },
    // Action to clear the token
    clearToken(state) {
      state.token = null;
    },
    // Action to set the user ID
    setId(state, action) {
      state.id = action.payload;
    },
    // Action to clear the user ID
    clearId(state) {
      state.id = null;
    },
  },
});

// Export the actions
export const { setToken, clearToken, setId, clearId } = authSlice.actions;

// Selector to get the token from the state
export const selectToken = (state) => state.auth.token;
// Selector to get the user ID from the state
export const selectId = (state) => state.auth.id;

// Export the reducer
export default authSlice.reducer;

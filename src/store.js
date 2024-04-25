import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import flashcardSlice from "./reducers/flashcardSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    api: flashcardSlice,
  },
});

export default store;
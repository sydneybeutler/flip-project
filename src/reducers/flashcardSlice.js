import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getCsrfToken = () => {
  const csrfToken = document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return csrfToken;
};

const initialState = {
  Flashcards: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

export const fetchFlashcards = createAsyncThunk(
  'api/fetchFlashcards',
  async (_, { getState }) => {
    const { token, id } = getState().auth; // Destructure to get token and user ID from auth state
    const response = await fetch('/api/flashcards/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-User-ID': id,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
);

export const deleteFlashcard = createAsyncThunk(
  'api/deleteFlashcard',
  async (_, { getState }) => {
    const { token, id } = getState().auth; // Destructure to get token and user ID from auth state
    const response = await fetch('/api/flashcards/${id}', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-User-ID': id,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
);

const flashcardSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cards
      .addCase(fetchFlashcards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFlashcards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchFlashcards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete card
      .addCase(deleteFlashcard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFlashcard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(deleteFlashcard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default flashcardSlice.reducer;
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = { query: "" };


const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload; 
    },
  },
});


export const { setSearchQuery } = searchSlice.actions;


export const store = configureStore({
  reducer: {
    search: searchSlice.reducer, 
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
